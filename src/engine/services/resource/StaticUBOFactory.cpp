#include "glad/glad.h"

#include "StaticUBOFactory.h"
#include "dto/UBODataDTO.h"
#include "../../definitions.h"
#include "core/UniformBuffer.h"
#include "../../enum/StaticUBO.h"
#include "../ResourceService.h"

namespace PEngine {
    void GenerateStaticUBOs(ResourceService *service) {
        std::vector<UBODataDTO> lights = {
                UBODataDTO{"lightPrimaryBuffer", UBOType::MAT4, MAX_LIGHTS},
                UBODataDTO{"lightSecondaryBuffer", UBOType::MAT4, MAX_LIGHTS},
        };
        std::vector<UBODataDTO> cameraProjection = {
                UBODataDTO{"projectionMatrix", UBOType::MAT4},
                UBODataDTO{"invProjectionMatrix", UBOType::MAT4},
                UBODataDTO{"bufferResolution", UBOType::VEC2},
                UBODataDTO{"logDepthFC", UBOType::FLOAT},
                UBODataDTO{"logC", UBOType::FLOAT},
        };
        std::vector<UBODataDTO> uber = {
                UBODataDTO{"shadowMapsQuantity", UBOType::FLOAT},
                UBODataDTO{"shadowMapResolution", UBOType::FLOAT},
                UBODataDTO{"lightQuantity", UBOType::INT},
                UBODataDTO{"SSRFalloff", UBOType::FLOAT},
                UBODataDTO{"stepSizeSSR", UBOType::FLOAT},
                UBODataDTO{"maxSSSDistance", UBOType::FLOAT},
                UBODataDTO{"SSSDepthThickness", UBOType::FLOAT},
                UBODataDTO{"SSSEdgeAttenuation", UBOType::FLOAT},
                UBODataDTO{"skylightSamples", UBOType::FLOAT},
                UBODataDTO{"SSSDepthDelta", UBOType::FLOAT},
                UBODataDTO{"SSAOFalloff", UBOType::FLOAT},
                UBODataDTO{"maxStepsSSR", UBOType::INT},
                UBODataDTO{"maxStepsSSS", UBOType::INT},
                UBODataDTO{"hasSkylight", UBOType::BOOL},
                UBODataDTO{"hasAmbientOcclusion", UBOType::BOOL}
        };
        std::vector<UBODataDTO> ssao = {
                UBODataDTO{"settings", UBOType::VEC4},
                UBODataDTO{"samples", UBOType::VEC4, SSAO_KERNELS},
                UBODataDTO{"noiseScale", UBOType::VEC2}
        };
        std::vector<UBODataDTO> lens = {
                UBODataDTO{"textureSizeXDOF", UBOType::FLOAT},
                UBODataDTO{"textureSizeYDOF", UBOType::FLOAT},
                UBODataDTO{"distortionIntensity", UBOType::FLOAT},
                UBODataDTO{"chromaticAberrationIntensity", UBOType::FLOAT},
                UBODataDTO{"distortionEnabled", UBOType::BOOL,},
                UBODataDTO{"chromaticAberrationEnabled", UBOType::BOOL},
                UBODataDTO{"bloomEnabled", UBOType::BOOL},
                UBODataDTO{"focusDistanceDOF", UBOType::FLOAT},
                UBODataDTO{"apertureDOF", UBOType::FLOAT},
                UBODataDTO{"focalLengthDOF", UBOType::FLOAT},
                UBODataDTO{"samplesDOF", UBOType::FLOAT},
                UBODataDTO{"vignetteEnabled", UBOType::BOOL},
                UBODataDTO{"vignetteStrength", UBOType::FLOAT},
                UBODataDTO{"gamma", UBOType::FLOAT},
                UBODataDTO{"exposure", UBOType::FLOAT}
        };
        std::vector<UBODataDTO> cameraView = {
                UBODataDTO{"viewProjection", UBOType::MAT4},
                UBODataDTO{"viewMatrix", UBOType::MAT4},
                UBODataDTO{"invViewMatrix", UBOType::MAT4},
                UBODataDTO{"placement", UBOType::VEC4},
        };
        std::vector<UBODataDTO> frameComposition = {
                UBODataDTO{"inverseFilterTextureSize", UBOType::VEC2},
                UBODataDTO{"useFXAA", UBOType::BOOL},
                UBODataDTO{"filmGrainEnabled", UBOType::BOOL},
                UBODataDTO{"FXAASpanMax", UBOType::FLOAT},
                UBODataDTO{"FXAAReduceMin", UBOType::FLOAT},
                UBODataDTO{"FXAAReduceMul", UBOType::FLOAT},
                UBODataDTO{"filmGrainStrength", UBOType::FLOAT},
        };


        (service->createResource<UniformBuffer>(StaticResource::UBO_CAMERA_VIEW))
                ->init(StaticUBO::CAMERA_VIEW, cameraView);
        (service->createResource<UniformBuffer>(StaticResource::UBO_FRAME_COMPOSITION))
                ->init(StaticUBO::FRAME_COMPOSITION, frameComposition);
        (service->createResource<UniformBuffer>(StaticResource::UBO_LENS_PP))
                ->init(StaticUBO::LENS_PP, lens);
        (service->createResource<UniformBuffer>(StaticResource::UBO_SSAO))
                ->init(StaticUBO::SSAO, ssao);
        (service->createResource<UniformBuffer>(StaticResource::UBO_UBER))
                ->init(StaticUBO::UBER, uber);
        (service->createResource<UniformBuffer>(StaticResource::UBO_LIGHTS))
                ->init(StaticUBO::LIGHTS, lights);
        (service->createResource<UniformBuffer>(StaticResource::UBO_CAMERA_PROJECTION))
                ->init(StaticUBO::CAMERA_PROJECTION, cameraProjection);
    }
}
