import StaticUBOs from "./StaticUBOs"
import CameraEffectsSerialization from "../static/CameraEffectsSerialization"
import IManageable from "@engine-core/IManageable";

const U_INT = new Uint8Array(1)
const FLOAT = new Float32Array(1)
export default class CameraEffects extends IManageable{
    cameraMotionBlur = false
    #bloom = false
    #filmGrain = false
    #vignetteEnabled = false
    #chromaticAberration = false
    #distortion = false
    DOF = false
    zNear = .1
    zFar = 1000
    fov = Math.PI / 2
    aspectRatio = 1
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


    restoreMetadata(data: CameraEffectsSerialization) {
        this.DOF = data.DOF
        this.bloom = data.bloom
        this.filmGrain = data.filmGrain
        this.vignetteEnabled = data.vignetteEnabled
        this.chromaticAberration = data.chromaticAberration
        this.distortion = data.distortion
        this.cameraMotionBlur = data.cameraMotionBlur
        this.zNear = data.zNear
        this.zFar = data.zFar
        this.fov = data.fov
        this.aspectRatio = data.aspectRatio
        this.size = data.size
        this.focusDistanceDOF = data.focusDistanceDOF
        this.apertureDOF = data.apertureDOF
        this.focalLengthDOF = data.focalLengthDOF
        this.samplesDOF = data.samplesDOF
        this.filmGrainStrength = data.filmGrainStrength
        this.vignetteStrength = data.vignetteStrength
        this.bloomThreshold = data.bloomThreshold
        this.bloomQuality = data.bloomQuality
        this.bloomOffset = data.bloomOffset
        this.gamma = data.gamma
        this.exposure = data.exposure
        this.chromaticAberrationStrength = data.chromaticAberrationStrength
        this.distortionStrength = data.distortionStrength
    }

    dumpEffects(): CameraEffectsSerialization {
        return {
            zNear: this.zNear,
            zFar: this.zFar,
            fov: this.fov,
            aspectRatio: this.aspectRatio,
            size: this.size,
            focusDistanceDOF: this.#focusDistanceDOF,
            apertureDOF: this.#apertureDOF,
            focalLengthDOF: this.#focalLengthDOF,
            samplesDOF: this.#samplesDOF,
            filmGrainStrength: this.#filmGrainStrength,
            vignetteStrength: this.#vignetteStrength,
            bloomThreshold: this.bloomThreshold,
            bloomQuality: this.bloomQuality,
            bloomOffset: this.bloomOffset,
            gamma: this.#gamma,
            exposure: this.#exposure,
            chromaticAberrationStrength: this.#chromaticAberrationStrength,
            distortionStrength: this.#distortionStrength,
            cameraMotionBlur: this.cameraMotionBlur,
            DOF: this.DOF,
            bloom: this.#bloom,
            filmGrain: this.#filmGrain,
            vignetteEnabled: this.#vignetteEnabled,
            chromaticAberration: this.#chromaticAberration,
            distortion: this.#distortion,
        }
    }

    get vignetteStrength() {
        return this.#vignetteStrength
    }

    set vignetteStrength(data) {
        this.#vignetteStrength = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("vignetteStrength", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get vignetteEnabled() {
        return this.#vignetteEnabled
    }

    set vignetteEnabled(data) {
        this.#vignetteEnabled = data
        StaticUBOs.lensPostProcessingUBO.bind()
        U_INT[0] = data ? 1 : 0
        StaticUBOs.lensPostProcessingUBO.updateData("vignetteEnabled", U_INT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get filmGrain() {
        return this.#filmGrain
    }

    get filmGrainStrength() {
        return this.#filmGrainStrength
    }

    set filmGrain(data) {
        this.#filmGrain = data
        FLOAT[0] = data ? 1 : 0
        StaticUBOs.frameCompositionUBO.bind()
        StaticUBOs.frameCompositionUBO.updateData("filmGrainEnabled", FLOAT)
        StaticUBOs.frameCompositionUBO.unbind()
    }

    set filmGrainStrength(data) {
        this.#filmGrainStrength = data
        StaticUBOs.frameCompositionUBO.bind()
        FLOAT[0] = data
        StaticUBOs.frameCompositionUBO.updateData("filmGrainStrength", FLOAT)
        StaticUBOs.frameCompositionUBO.unbind()
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
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("focusDistanceDOF", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get apertureDOF() {
        return this.#apertureDOF
    }

    set apertureDOF(data) {
        this.#apertureDOF = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("apertureDOF", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get focalLengthDOF() {
        return this.#focalLengthDOF
    }

    set focalLengthDOF(data) {
        this.#focalLengthDOF = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("focalLengthDOF", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get samplesDOF() {
        return this.#samplesDOF
    }

    set samplesDOF(data) {
        this.#samplesDOF = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("samplesDOF", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }


    set gamma(data) {
        this.#gamma = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("gamma", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    set exposure(data) {
        this.#exposure = data
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = data
        StaticUBOs.lensPostProcessingUBO.updateData("exposure", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get distortion() {
        return this.#distortion
    }

    set distortion(v) {
        this.#distortion = v
        StaticUBOs.lensPostProcessingUBO.bind()
        U_INT[0] = v ? 1 : 0
        StaticUBOs.lensPostProcessingUBO.updateData("distortionEnabled", U_INT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get chromaticAberration() {
        return this.#chromaticAberration
    }

    set chromaticAberration(v) {
        this.#chromaticAberration = v
        StaticUBOs.lensPostProcessingUBO.bind()
        U_INT[0] = v ? 1 : 0
        StaticUBOs.lensPostProcessingUBO.updateData("chromaticAberrationEnabled", U_INT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get bloom() {
        return this.#bloom
    }

    set bloom(v) {
        this.#bloom = v
        StaticUBOs.lensPostProcessingUBO.bind()
        U_INT[0] = v ? 1 : 0
        StaticUBOs.lensPostProcessingUBO.updateData("bloomEnabled", U_INT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get chromaticAberrationStrength() {
        return this.#chromaticAberrationStrength
    }

    set chromaticAberrationStrength(v) {
        this.#chromaticAberrationStrength = v
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = v
        StaticUBOs.lensPostProcessingUBO.updateData("chromaticAberrationIntensity", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

    get distortionStrength() {
        return this.#distortionStrength
    }

    set distortionStrength(v) {
        this.#distortionStrength = v
        StaticUBOs.lensPostProcessingUBO.bind()
        FLOAT[0] = v
        StaticUBOs.lensPostProcessingUBO.updateData("distortionIntensity", FLOAT)
        StaticUBOs.lensPostProcessingUBO.unbind()
    }

}