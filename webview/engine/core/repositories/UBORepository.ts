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
        UBORepository.cameraViewUBO = this.createResource(UBO).initialize(
            StaticUBONames.CAMERA_VIEW,
            [
                {name: "viewProjection", type: "mat4"},
                {name: "viewMatrix", type: "mat4"},
                {name: "invViewMatrix", type: "mat4"},
                {name: "placement", type: "vec4"},
            ])
        UBORepository.frameCompositionUBO = this.createResource(UBO).initialize(
            StaticUBONames.FRAME_COMPOSITION,
            [
                {type: "vec2", name: "inverseFilterTextureSize"},

                {type: "bool", name: "useFXAA"},
                {type: "bool", name: "filmGrainEnabled"},

                {type: "float", name: "FXAASpanMax"},
                {type: "float", name: "FXAAReduceMin"},
                {type: "float", name: "FXAAReduceMul"},
                {type: "float", name: "filmGrainStrength"},

            ]
        )
        UBORepository.lensPostProcessingUBO = this.createResource(UBO).initialize(
            StaticUBONames.LENS_PP,
            [
                {type: "float", name: "textureSizeXDOF"},
                {type: "float", name: "textureSizeYDOF"},
                {type: "float", name: "distortionIntensity"},
                {type: "float", name: "chromaticAberrationIntensity"},
                {type: "bool", name: "distortionEnabled"},
                {type: "bool", name: "chromaticAberrationEnabled"},
                {type: "bool", name: "bloomEnabled"},


                {type: "float", name: "focusDistanceDOF"},
                {type: "float", name: "apertureDOF"},
                {type: "float", name: "focalLengthDOF"},
                {type: "float", name: "samplesDOF"},

                {type: "bool", name: "vignetteEnabled"},
                {type: "float", name: "vignetteStrength"},
                {type: "float", name: "gamma"},
                {type: "float", name: "exposure"}
            ]
        )
        UBORepository.ssaoUBO = this.createResource(UBO).initialize(
            StaticUBONames.SSAO,
            [
                {name: "settings", type: "vec4"},
                {name: "samples", type: "vec4", dataLength: 64},
                {name: "noiseScale", type: "vec2"}
            ]
        )
        UBORepository.uberUBO = this.createResource(UBO).initialize(
            StaticUBONames.UBER,
            [
                {name: "shadowMapsQuantity", type: "float"},
                {name: "shadowMapResolution", type: "float"},

                {name: "lightQuantity", type: "int"},
                {type: "float", name: "SSRFalloff"},
                {type: "float", name: "stepSizeSSR"},
                {type: "float", name: "maxSSSDistance"},
                {type: "float", name: "SSSDepthThickness"},
                {type: "float", name: "SSSEdgeAttenuation"},
                {type: "float", name: "skylightSamples"},
                {type: "float", name: "SSSDepthDelta"},
                {type: "float", name: "SSAOFalloff"},
                {type: "int", name: "maxStepsSSR"},
                {type: "int", name: "maxStepsSSS"},
                {type: "bool", name: "hasSkylight"},
                {type: "bool", name: "hasAmbientOcclusion"}
            ]
        )
        UBORepository.lightsUBO = this.createResource(UBO).initialize(
            StaticUBONames.LIGHTS,
            [
                {name: "lightPrimaryBuffer", type: "mat4", dataLength: UberShaderService.MAX_LIGHTS},
                {name: "lightSecondaryBuffer", type: "mat4", dataLength: UberShaderService.MAX_LIGHTS},
            ]
        )
        UBORepository.cameraProjectionUBO = this.createResource(UBO).initialize(
            StaticUBONames.CAMERA_PROJECTION,
            [
                {name: "projectionMatrix", type: "mat4"},
                {name: "invProjectionMatrix", type: "mat4"},
                {name: "bufferResolution", type: "vec2"},
                {name: "logDepthFC", type: "float"},
                {name: "logC", type: "float"},
            ]
        )

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