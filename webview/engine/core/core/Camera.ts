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
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

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
    fov: number = Math.PI / 2
    orthographicProjectionSize: number

    cameraMotionBlur = false
    bloom = false
    filmGrain = false
    vignetteEnabled = false
    chromaticAberration = false
    distortion = false
    DOF = false
    size = 50
    focusDistanceDOF = 10
    apertureDOF = 1.2
    focalLengthDOF = 5
    samplesDOF = 100
    filmGrainStrength = 1.
    vignetteStrength = .25
    bloomThreshold = .75
    bloomQuality = 8
    bloomOffset = 0
    gamma = 2.2
    exposure = 1.
    chromaticAberrationStrength = 1
    distortionStrength = 1

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
        this.updateUBOs()
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

    updateUBOs() {
        this.#updateLensUBO("vignetteStrength", this.vignetteStrength)
        this.#updateLensUBO("vignetteEnabled", this.vignetteEnabled)
        this.#updateLensUBO("filmGrainEnabled", this.filmGrain)
        this.#updateLensUBO("filmGrainStrength", this.filmGrainStrength)
        this.#updateLensUBO("focusDistanceDOF", this.focusDistanceDOF)
        this.#updateLensUBO("apertureDOF", this.apertureDOF)
        this.#updateLensUBO("focalLengthDOF", this.focalLengthDOF)
        this.#updateLensUBO("samplesDOF", this.samplesDOF)
        this.#updateLensUBO("gamma", this.gamma)
        this.#updateLensUBO("exposure", this.exposure)
        this.#updateLensUBO("distortionEnabled", this.distortion)
        this.#updateLensUBO("chromaticAberrationEnabled", this.chromaticAberration)
        this.#updateLensUBO("bloomEnabled", this.bloom)
        this.#updateLensUBO("chromaticAberrationIntensity", this.chromaticAberrationStrength)
        this.#updateLensUBO("distortionIntensity", this.distortionStrength)
    }

    #updateLensUBO(name: string, data: number | boolean) {
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

RepositoryService.serializable(Camera)