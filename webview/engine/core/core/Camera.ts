import ENVIRONMENT from "../static/ENVIRONMENT"
import {glMatrix, quat, vec3} from "gl-matrix"
import ConversionAPI from "../services/ConversionAPI"
import MotionBlurSystem from "../runtime/MotionBlurSystem"
import GPU from "./GPU"
import Entity from "../instances/Entity"
import CameraComponent from "../instances/components/CameraComponent"
import {CameraProjectionType} from "@engine-core/engine-d";
import ArrayBufferAPI from "@engine-core/services/ArrayBufferAPI";
import UBORepository from "@engine-core/repositories/UBORepository";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";

export default class Camera extends AbstractEngineCoreService {
    _dynamicAspectRatio = false
    trackingEntity: Entity
    hasChangedProjection: boolean;
    hasChangedView: boolean;
    translationSmoothing: number;
    viewNeedsUpdate: boolean;
    projectionNeedsUpdate: boolean;
    projectionType: CameraProjectionType;
    currentTranslation = vec3.create()
    currentRotation = quat.create()

    position = ArrayBufferAPI.allocateVector(3)
    viewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    projectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invViewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    viewProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    previousViewProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    staticViewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    skyboxProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invSkyboxProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    viewUBOBuffer = ArrayBufferAPI.allocateVector(52)
    projectionUBOBuffer = ArrayBufferAPI.allocateVector(35)
    translationBuffer = <vec3>ArrayBufferAPI.allocateVector(3)
    rotationBuffer = <quat>ArrayBufferAPI.allocateVector(4, 0, true)
    aspectRatio: number = 1
    zNear: number = .1
    zFar: number = 100
    fov: number = Math.PI/2
    orthographicProjectionSize: number

    cameraMotionBlur = false
    _bloom = false
    _filmGrain = false
    _vignetteEnabled = false
    _chromaticAberration = false
    _distortion = false
    DOF = false
    size = 50
    _focusDistanceDOF = 10
    _apertureDOF = 1.2
    _focalLengthDOF = 5
    _samplesDOF = 100
    _filmGrainStrength = 1.
    _vignetteStrength = .25
    bloomThreshold = .75
    bloomQuality = 8
    bloomOffset = 0
    _gamma = 2.2
    _exposure = 1.
    _chromaticAberrationStrength = 1
    _distortionStrength = 1

    updateAspectRatio() {
        const bBox = GPU.canvas.getBoundingClientRect()
        ConversionAPI.canvasBBox = bBox
        if (this.engine.getEnvironment() === ENVIRONMENT.DEV || this._dynamicAspectRatio) {
            this.aspectRatio = bBox.width / bBox.height
            this.updateProjection()
        }
    }

    isOrthographic(): boolean {
        return this.projectionType === CameraProjectionType.ORTHOGRAPHIC
    }

    setIsOrthographic(data: boolean) {
        this.projectionType = data ? CameraProjectionType.ORTHOGRAPHIC : CameraProjectionType.PERSPECTIVE
        this.projectionNeedsUpdate = true
    }


    updateProjection() {
        this.projectionNeedsUpdate = true
    }

    updateView() {
        this.viewNeedsUpdate = true
    }

    updateViewTarget(data: Entity | Object) {
        if (!data)
            this.trackingEntity = undefined

        let cameraObj
        if (data instanceof Entity) {
            this.trackingEntity = data
            cameraObj = data.cameraComponent
        } else
            cameraObj = data

        if (!data)
            return

        cameraObj = {...(new CameraComponent()), ...cameraObj}

        MotionBlurSystem.enabled = cameraObj.motionBlurEnabled === true || cameraObj.cameraMotionBlur === true

        MotionBlurSystem.velocityScale = cameraObj.mbVelocityScale
        MotionBlurSystem.maxSamples = cameraObj.mbSamples

        this.zFar = cameraObj.zFar
        this.zNear = cameraObj.zNear
        this.fov = cameraObj.fov < Math.PI * 2 ? cameraObj.fov : glMatrix.toRadian(cameraObj.fov)
        this._dynamicAspectRatio = cameraObj.dynamicAspectRatio
        this.setIsOrthographic(cameraObj.ortho)
        this.cameraMotionBlur = cameraObj.cameraMotionBlur
        this.vignetteEnabled = cameraObj.vignette
        this.vignetteStrength = cameraObj.vignetteStrength
        this.distortion = cameraObj.distortion
        this.distortionStrength = cameraObj.distortionStrength
        this.chromaticAberration = cameraObj.chromaticAberration
        this.chromaticAberrationStrength = cameraObj.chromaticAberrationStrength
        this.filmGrain = cameraObj.filmGrain
        this.filmGrainStrength = cameraObj.filmGrainStrength
        this.bloom = cameraObj.bloom
        this.bloomThreshold = cameraObj.bloomThreshold
        this.gamma = cameraObj.gamma
        this.exposure = cameraObj.exposure
        this.apertureDOF = cameraObj.apertureDOF
        this.focalLengthDOF = cameraObj.focalLengthDOF
        this.focusDistanceDOF = cameraObj.focusDistanceDOF
        this.samplesDOF = cameraObj.samplesDOF
        this.DOF = cameraObj.enabledDOF

        if (!cameraObj.dynamicAspectRatio && cameraObj.aspectRatio)
            this.aspectRatio = cameraObj.aspectRatio
        else
            this.updateAspectRatio()
        this.updateProjection()
    }


    addTranslation(data: number[] | Float32Array) {
        const T = this.translationBuffer
        T[0] = T[0] + data[0] || 0
        T[1] = T[1] + data[1] || 0
        T[2] = T[2] + data[2] || 0
    }

    updateTranslation(data: number[] | Float32Array) {
        const T = this.translationBuffer
        T[0] = data[0] || 0
        T[1] = data[1] || 0
        T[2] = data[2] || 0
    }

    updateRotation(data: number[] | Float32Array) {
        const R = this.rotationBuffer

        R[0] = data[0] || 0
        R[1] = data[1] || 0
        R[2] = data[2] || 0
        R[3] = data[3] || 0
    }

    get vignetteStrength() {
        return this._vignetteStrength
    }

    set vignetteStrength(data) {
        this._vignetteStrength = data
        this.updateLensUBO("vignetteStrength", data)
    }

    get vignetteEnabled() {
        return this._vignetteEnabled
    }

    set vignetteEnabled(data) {
        this._vignetteEnabled = data
        this.updateLensUBO("vignetteEnabled", data)
    }

    get filmGrain() {
        return this._filmGrain
    }

    get filmGrainStrength() {
        return this._filmGrainStrength
    }

    set filmGrain(data) {
        this._filmGrain = data
        this.updateLensUBO("filmGrainEnabled", data)
    }

    set filmGrainStrength(data) {
        this._filmGrainStrength = data
        this.updateLensUBO("filmGrainStrength", data)

    }

    get gamma() {
        return this._gamma
    }

    get exposure() {
        return this._exposure
    }

    get focusDistanceDOF() {
        return this._focusDistanceDOF
    }

    set focusDistanceDOF(data) {
        this._focusDistanceDOF = data
        this.updateLensUBO("focusDistanceDOF", data)
    }

    get apertureDOF() {
        return this._apertureDOF
    }

    set apertureDOF(data) {
        this._apertureDOF = data
        this.updateLensUBO("apertureDOF", data)
    }

    get focalLengthDOF() {
        return this._focalLengthDOF
    }

    set focalLengthDOF(data) {
        this._focalLengthDOF = data
        this.updateLensUBO("focalLengthDOF", data)

    }

    get samplesDOF() {
        return this._samplesDOF
    }

    set samplesDOF(data) {
        this._samplesDOF = data
        this.updateLensUBO("samplesDOF", data)
    }

    set gamma(data) {
        this._gamma = data
        this.updateLensUBO("gamma", data)
    }

    set exposure(data) {
        this._exposure = data
        this.updateLensUBO("exposure", data)
    }

    get distortion() {
        return this._distortion
    }

    set distortion(v) {
        this._distortion = v
        this.updateLensUBO("distortionEnabled", v)
    }

    get chromaticAberration() {
        return this._chromaticAberration
    }

    set chromaticAberration(v) {
        this._chromaticAberration = v
        this.updateLensUBO("chromaticAberrationEnabled", v)
    }

    get bloom() {
        return this._bloom
    }

    set bloom(v) {
        this._bloom = v
        this.updateLensUBO("bloomEnabled", v)
    }

    get chromaticAberrationStrength() {
        return this._chromaticAberrationStrength
    }

    set chromaticAberrationStrength(v) {
        this._chromaticAberrationStrength = v
        this.updateLensUBO("chromaticAberrationIntensity", v)
    }

    get distortionStrength() {
        return this._distortionStrength
    }

    set distortionStrength(v) {
        this._distortionStrength = v
        this.updateLensUBO("distortionIntensity", v)
    }

    updateLensUBO(name: string, data: number | boolean) {
        if (typeof data === "boolean") {
            const U_INT = new Uint8Array(1)
            U_INT[0] = data ? 1 : 0
            UBORepository.lensPostProcessingUBO.bind()
            UBORepository.lensPostProcessingUBO.updateData(name, U_INT)
            UBORepository.lensPostProcessingUBO.unbind()
        } else {
            const FLOAT = new Float32Array(1)
            FLOAT[0] = data
            UBORepository.lensPostProcessingUBO.bind()
            UBORepository.lensPostProcessingUBO.updateData(name, FLOAT)
            UBORepository.lensPostProcessingUBO.unbind()
        }
    }
}

