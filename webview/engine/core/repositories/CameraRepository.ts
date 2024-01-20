import ENVIRONMENT from "../static/ENVIRONMENT"
import {glMatrix, quat, vec3, vec4} from "gl-matrix"
import ConversionAPI from "../services/ConversionAPI"
import MotionBlurSystem from "../runtime/MotionBlurSystem"
import GPUService from "../services/GPUService"
import Entity from "../instances/Entity"
import CameraComponent from "../instances/components/CameraComponent"
import {CameraProjectionType} from "@engine-core/engine-d";
import AbstractEngineService from "@engine-core/AbstractEngineService";
import ArrayBufferAPI from "@engine-core/services/ArrayBufferAPI";
import StaticUBOs from "@engine-core/repositories/StaticUBOs";

export default class CameraRepository extends AbstractEngineService {
    #dynamicAspectRatio = false
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
    projectionBuffer = ArrayBufferAPI.allocateVector(5)
    translationBuffer = <vec3>ArrayBufferAPI.allocateVector(3)
    rotationBuffer = <quat>ArrayBufferAPI.allocateVector(4, 0, true)

    cameraMotionBlur = false
    #bloom = false
    #filmGrain = false
    #vignetteEnabled = false
    #chromaticAberration = false
    #distortion = false
    DOF = false
    size = 50
    #focusDistanceDOF = 10
    #apertureDOF = 1.2
    #focalLengthDOF = 5
    #samplesDOF = 100
    #filmGrainStrength = 1.
    #vignetteStrength = .25
    bloomThreshold = .75
    bloomQuality = 8
    bloomOffset = 0
    #gamma = 2.2
    #exposure = 1.
    #chromaticAberrationStrength = 1
    #distortionStrength = 1

    async initialize(): Promise<void> {
        this.projectionBuffer[4] = 10
    }

    updateAspectRatio() {
        const bBox = GPUService.canvas.getBoundingClientRect()
        ConversionAPI.canvasBBox = bBox
        if (this.engine.environment === ENVIRONMENT.DEV || this.#dynamicAspectRatio) {
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
        this.#dynamicAspectRatio = cameraObj.dynamicAspectRatio
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


    get zFar() {
        return this.projectionBuffer[0]
    }

    get zNear() {
        return this.projectionBuffer[1]
    }

    get fov() {
        return this.projectionBuffer[2]
    }

    get aspectRatio() {
        return this.projectionBuffer[3]
    }

    get orthographicProjectionSize() {
        return this.projectionBuffer[4]
    }

    set zFar(data) {
        this.projectionBuffer[0] = data
    }

    set zNear(data) {
        this.projectionBuffer[1] = data
    }

    set fov(data) {
        this.projectionBuffer[2] = data
    }

    set aspectRatio(data) {
        this.projectionBuffer[3] = data
    }

    set orthographicProjectionSize(data) {
        this.projectionBuffer[4] = data
    }



    get vignetteStrength() {
        return this.#vignetteStrength
    }

    set vignetteStrength(data) {
        this.#vignetteStrength = data
        this.updateLensUBO("vignetteStrength", data)
    }

    get vignetteEnabled() {
        return this.#vignetteEnabled
    }

    set vignetteEnabled(data) {
        this.#vignetteEnabled = data
        this.updateLensUBO("vignetteEnabled", data)
    }

    get filmGrain() {
        return this.#filmGrain
    }

    get filmGrainStrength() {
        return this.#filmGrainStrength
    }

    set filmGrain(data) {
        this.#filmGrain = data
        this.updateLensUBO("filmGrainEnabled", data)
    }

    set filmGrainStrength(data) {
        this.#filmGrainStrength = data
        this.updateLensUBO("filmGrainStrength", data)

    }

    get gamma() {
        return this.#gamma
    }

    get exposure() {
        return this.#exposure
    }

    get focusDistanceDOF() {
        return this.#focusDistanceDOF
    }

    set focusDistanceDOF(data) {
        this.#focusDistanceDOF = data
        this.updateLensUBO("focusDistanceDOF", data)
    }

    get apertureDOF() {
        return this.#apertureDOF
    }

    set apertureDOF(data) {
        this.#apertureDOF = data
        this.updateLensUBO("apertureDOF", data)
    }

    get focalLengthDOF() {
        return this.#focalLengthDOF
    }

    set focalLengthDOF(data) {
        this.#focalLengthDOF = data
        this.updateLensUBO("focalLengthDOF", data)

    }

    get samplesDOF() {
        return this.#samplesDOF
    }

    set samplesDOF(data) {
        this.#samplesDOF = data
        this.updateLensUBO("samplesDOF", data)
    }

    set gamma(data) {
        this.#gamma = data
        this.updateLensUBO("gamma", data)
    }

    set exposure(data) {
        this.#exposure = data
        this.updateLensUBO("exposure", data)
    }

    get distortion() {
        return this.#distortion
    }

    set distortion(v) {
        this.#distortion = v
        this.updateLensUBO("distortionEnabled", v)
    }

    get chromaticAberration() {
        return this.#chromaticAberration
    }

    set chromaticAberration(v) {
        this.#chromaticAberration = v
        this.updateLensUBO("chromaticAberrationEnabled", v)
    }

    get bloom() {
        return this.#bloom
    }

    set bloom(v) {
        this.#bloom = v
        this.updateLensUBO("bloomEnabled", v)
    }

    get chromaticAberrationStrength() {
        return this.#chromaticAberrationStrength
    }

    set chromaticAberrationStrength(v) {
        this.#chromaticAberrationStrength = v
        this.updateLensUBO("chromaticAberrationIntensity", v)
    }

    get distortionStrength() {
        return this.#distortionStrength
    }

    set distortionStrength(v) {
        this.#distortionStrength = v
        this.updateLensUBO("distortionIntensity", v)
    }

    updateLensUBO(name: string, data: number | boolean){
        if(typeof data === "boolean"){
            const U_INT = new Uint8Array(1)
            U_INT[0] = data ? 1 : 0
            StaticUBOs.lensPostProcessingUBO.bind()
            StaticUBOs.lensPostProcessingUBO.updateData(name, U_INT)
            StaticUBOs.lensPostProcessingUBO.unbind()
        }else{
            const FLOAT = new Float32Array(1)
            FLOAT[0] = data
            StaticUBOs.lensPostProcessingUBO.bind()
            StaticUBOs.lensPostProcessingUBO.updateData(name, FLOAT)
            StaticUBOs.lensPostProcessingUBO.unbind()
        }
    }
}

