import UBO from "../instances/UBO"
import UberShaderService from "../services/UberShaderService"
import GPU from "../core/GPU"
import AbstractEngineService from "@engine-core/AbstractEngineService";

export enum StaticUBONames {
    CAMERA_VIEW = "CameraViewInfo",
    FRAME_COMPOSITION = "CompositionSettings",
    LENS_PP = "LensEffects",
    SSAO = "Settings",
    UBER = "UberShaderSettings",
    LIGHTS = "Lights",
    CAMERA_PROJECTION = "CameraProjectionInfo"
}

export default class UBORepository extends AbstractEngineService {
    static cameraViewUBO?: UBO
    static frameCompositionUBO?: UBO
    static lensPostProcessingUBO?: UBO
    static ssaoUBO?: UBO
    static uberUBO?: UBO
    static lightsUBO?: UBO
    static cameraProjectionUBO?: UBO

    async initialize() {
        const lights = [
            {name: "lightPrimaryBuffer", type: "mat4", dataLength: UberShaderService.MAX_LIGHTS},
            {name: "lightSecondaryBuffer", type: "mat4", dataLength: UberShaderService.MAX_LIGHTS},
        ];
        const cameraProjection = [
            {name: "projectionMatrix", type: "mat4"},
            {name: "invProjectionMatrix", type: "mat4"},
            {name: "bufferResolution", type: "vec2"},
            {name: "logDepthFC", type: "float"},
            {name: "logC", type: "float"},
        ];
        const uber = [
            {name: "shadowMapsQuantity", type: "float"},
            {name: "shadowMapResolution", type: "float"},
            {name: "lightQuantity", type: "int"},
            {name: "SSRFalloff", type: "float"},
            {name: "stepSizeSSR", type: "float"},
            {name: "maxSSSDistance", type: "float"},
            {name: "SSSDepthThickness", type: "float"},
            {name: "SSSEdgeAttenuation", type: "float"},
            {name: "skylightSamples", type: "float"},
            {name: "SSSDepthDelta", type: "float"},
            {name: "SSAOFalloff", type: "float"},
            {name: "maxStepsSSR", type: "int"},
            {name: "maxStepsSSS", type: "int"},
            {name: "hasSkylight", type: "bool"},
            {name: "hasAmbientOcclusion", type: "bool"}
        ];
        const ssao = [
            {name: "settings", type: "vec4"},
            {name: "samples", type: "vec4", dataLength: 64},
            {name: "noiseScale", type: "vec2"}
        ];
        const lens = [
            {name: "textureSizeXDOF", type: "float"},
            {name: "textureSizeYDOF", type: "float"},
            {name: "distortionIntensity", type: "float"},
            {name: "chromaticAberrationIntensity", type: "float"},
            {name: "distortionEnabled", type: "bool",},
            {name: "chromaticAberrationEnabled", type: "bool",},
            {name: "bloomEnabled", type: "bool",},
            {name: "focusDistanceDOF", type: "float"},
            {name: "apertureDOF", type: "float"},
            {name: "focalLengthDOF", type: "float"},
            {name: "samplesDOF", type: "float"},
            {name: "vignetteEnabled", type: "bool",},
            {name: "vignetteStrength", type: "float"},
            {name: "gamma", type: "float"},
            {name: "exposure", type: "float"}
        ];
        const cameraView = [
            {name: "viewProjection", type: "mat4"},
            {name: "viewMatrix", type: "mat4"},
            {name: "invViewMatrix", type: "mat4"},
            {name: "placement", type: "vec4"},
        ];
        const frameComposition = [
            {name: "inverseFilterTextureSize", type: "vec2"},
            {name: "useFXAA", type: "bool"},
            {name: "filmGrainEnabled", type: "bool"},
            {name: "FXAASpanMax", type: "float"},
            {name: "FXAAReduceMin", type: "float"},
            {name: "FXAAReduceMul", type: "float"},
            {name: "filmGrainStrength", type: "float"},
        ];

        UBORepository.cameraViewUBO = this.createResource(UBO).initialize(StaticUBONames.CAMERA_VIEW, cameraView)
        UBORepository.frameCompositionUBO = this.createResource(UBO).initialize(StaticUBONames.FRAME_COMPOSITION, frameComposition)
        UBORepository.lensPostProcessingUBO = this.createResource(UBO).initialize(StaticUBONames.LENS_PP, lens)
        UBORepository.ssaoUBO = this.createResource(UBO).initialize(StaticUBONames.SSAO, ssao)
        UBORepository.uberUBO = this.createResource(UBO).initialize(StaticUBONames.UBER, uber)
        UBORepository.lightsUBO = this.createResource(UBO).initialize(StaticUBONames.LIGHTS, lights)
        UBORepository.cameraProjectionUBO = this.createResource(UBO).initialize(StaticUBONames.CAMERA_PROJECTION, cameraProjection)

        const F32 = new Float32Array([2.2])
        UBORepository.lensPostProcessingUBO.bind()
        UBORepository.lensPostProcessingUBO.updateData("gamma", F32)
        F32[0] = 1
        UBORepository.lensPostProcessingUBO.updateData("exposure", F32)
        F32[0] = GPU.internalResolution.w
        UBORepository.lensPostProcessingUBO.updateData("textureSizeXDOF", F32)
        F32[0] = GPU.internalResolution.h
        UBORepository.lensPostProcessingUBO.updateData("textureSizeYDOF", F32)
        UBORepository.lensPostProcessingUBO.unbind()
    }
}