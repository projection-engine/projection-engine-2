#include "StaticResourceFactory.h"
#include "core/Shader.h"
#include "core/Mesh.h"
#include "core/UBO.h"
#include "../../enum/StaticShader.h"
#include "core/FrameBuffer.h"
#include "core/Texture.h"
#include "../../util/GPUUtil.h"

namespace PEngine {
    void
    StaticResourceFactory::InitializeShaders(std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        rMap[StaticResource::SHADER_SPRITE] = CreateShader(StaticShader::SPRITE_VERTEX, StaticShader::SPRITE_FRAG);
        rMap[StaticResource::SHADER_VBUFFER] = CreateShader(StaticShader::V_BUFFER_VERT, StaticShader::V_BUFFER_FRAG);
        rMap[StaticResource::SHADER_TO_SCREEN] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::TO_SCREEN);
        rMap[StaticResource::SHADER_BILINEAR_DOWNSCALE] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                       StaticShader::BILINEAR_DOWNSCALE);
        rMap[StaticResource::SHADER_BILATERAL_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                   StaticShader::BILATERAL_BLUR);
        rMap[StaticResource::SHADER_BOKEH] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::BOKEH_FRAG);
        rMap[StaticResource::SHADER_IRRADIANCE] = CreateShader(StaticShader::CUBEMAP, StaticShader::IRRADIANCE_MAP);
        rMap[StaticResource::SHADER_PREFILTERING] = CreateShader(StaticShader::CUBEMAP, StaticShader::PREFILTERED_MAP);
        rMap[StaticResource::SHADER_SSGI] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::SSGI);
        rMap[StaticResource::SHADER_MOTION_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                StaticShader::MOTION_BLUR_FRAG);
        rMap[StaticResource::SHADER_SSAO] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::SSAO);
        rMap[StaticResource::SHADER_BOX_BLUR] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::BOX_BLUR_FRAG);
        rMap[StaticResource::SHADER_DIRECTIONAL_SHADOWS] = CreateShader(StaticShader::SHADOWS_VERTEX,
                                                                        StaticShader::DIRECTIONAL_SHADOWS);
        rMap[StaticResource::SHADER_POINT_SHADOWS] = CreateShader(StaticShader::SHADOWS_VERTEX,
                                                                  StaticShader::OMNIDIRECTIONAL_SHADOWS);
        rMap[StaticResource::SHADER_FXAA] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::FXAA_FRAG);
        rMap[StaticResource::SHADER_BRIGHTNESS_FILTER] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                      StaticShader::BRIGHTNESS_FILTER_FRAG);
        rMap[StaticResource::SHADER_LENS_POST_PROCESSING] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                         StaticShader::LENS_POST_PROCESSING_FRAG);
        rMap[StaticResource::SHADER_GAUSSIAN_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                  StaticShader::GAUSSIAN_FRAG);
        rMap[StaticResource::SHADER_TEND_UPSAMPLING] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                    StaticShader::UPSAMPLING_TEND_FRAG);
        rMap[StaticResource::SHADER_ATMOSPHERE] = CreateShader(StaticShader::QUAD_VERTEX,
                                                               StaticShader::ATMOSPHERE_FRAG);
    }

    void StaticResourceFactory::InitializeFBOs(int width, int height,
                                               std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        int halfResW = width / 2;
        int halfResH = height / 2;

        FBOTextureDTO linearTexture{-1, -1};
        FBOTextureDTO gizmo{-1, -1};
        FBOTextureDTO visibilityA{-1, -1};
        FBOTextureDTO visibilityB{-1, -1};
        FBOTextureDTO ssao{-1, -1};
        FBOTextureDTO defaultSettings{width, height};

        linearTexture.linear = true;
        linearTexture.precision = GL_RGBA;
        linearTexture.format = GL_RGBA;
        linearTexture.type = GL_UNSIGNED_BYTE;

        gizmo.precision = GL_RGBA;
        gizmo.format = GL_RGBA;
        gizmo.type = GL_UNSIGNED_BYTE;

        visibilityA.attachment = 0;
        visibilityA.precision = GL_RGBA32F;
        visibilityA.format = GL_RGBA;

        visibilityB.attachment = 1;
        visibilityB.precision = GL_RGBA;
        visibilityB.format = GL_RGBA;
        visibilityB.type = GL_UNSIGNED_BYTE;

        ssao.linear = true;
        ssao.precision = GL_R8;
        ssao.format = GL_RED;
        ssao.type = GL_UNSIGNED_BYTE;

        rMap[StaticResource::FBO_GIZMO] = (new FrameBuffer(width, height))->texture(gizmo)->depthTest();
        rMap[StaticResource::FBO_VISIBILITY] = (new FrameBuffer(width, height))->texture(visibilityA)->texture(
                visibilityB)->depthTest();
        rMap[StaticResource::FBO_POST_PROCESSING_1] = (new FrameBuffer(width, height))->texture(defaultSettings);
        rMap[StaticResource::FBO_POST_PROCESSING_2] = (new FrameBuffer(width, height))->texture(
                defaultSettings)->depthTest();
        rMap[StaticResource::FBO_LENS] = (new FrameBuffer(width, height))->texture(defaultSettings);
        rMap[StaticResource::FBO_SSGI] = (new FrameBuffer(halfResW, halfResH))->texture(linearTexture);
        rMap[StaticResource::FBO_SSGI_FALLBACK] = (new FrameBuffer(halfResW, halfResH))->texture(linearTexture);
        rMap[StaticResource::FBO_SSAO] = (new FrameBuffer(halfResW, halfResH))->texture(ssao);
        rMap[StaticResource::FBO_SSAO_BLURRED] = (new FrameBuffer(halfResW, halfResH))->texture(ssao);

 
        int w = width;
        int h = height;
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_1);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_2);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_3);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_4);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_5);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_6);
        GenerateBlurBuffer(w, h, 0.5, rMap, linearTexture, StaticResource::FBO_DOWNSCALE_7);

        GenerateBlurBuffer(w, h, 4, rMap, linearTexture, StaticResource::FBO_UPSCALE_1);
        GenerateBlurBuffer(w, h, 4, rMap, linearTexture, StaticResource::FBO_UPSCALE_2);
        
        GenerateDirectionalShadowsFBO(width, height, rMap);
        
    }

    void StaticResourceFactory::GenerateNoiseTexture(std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        const int RESOLUTION = 4;

        const NoiseTextureDTO &dto = GPUUtil::GenerateNoise(64, RESOLUTION);

//        UBORepository.ssaoUBO.bind()
//        UBORepository.ssaoUBO.updateData("samples", kernels)
//        UBORepository.ssaoUBO.unbind()

        auto *pTexture = new Texture();
        rMap[StaticResource::TEXTURE_NOISE] = pTexture;
        glBindTexture(GL_TEXTURE_2D, pTexture->texture);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
        glTexStorage2D(GL_TEXTURE_2D, 1, GL_RG16F, RESOLUTION, RESOLUTION);
        glTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, RESOLUTION, RESOLUTION, GL_RG, GL_FLOAT, &dto.noiseTextureData[0]);
    }
    
    void StaticResourceFactory::GenerateBlurBuffer(
            int &w,
            int &h,
            float multiplier,
            std::unordered_map<StaticResource, AbstractResource *> &rMap,
            FBOTextureDTO &linearTexture,
            StaticResource name) {
        w *= multiplier;
        h *= multiplier;
        rMap[name] = (new FrameBuffer(w, h))->texture(linearTexture);
    }

    void StaticResourceFactory::InitializeMeshes(std::unordered_map<StaticResource, AbstractResource *> &rMap) {

    }
    void StaticResourceFactory::InitializeUBOs(std::unordered_map<StaticResource, AbstractResource *> &rMap) {

    }

    void StaticResourceFactory::GenerateDirectionalShadowsFBO(
            int width,
            int height,
            std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        if (rMap.count(StaticResource::FBO_DIRECTIONAL_SHADOWS)) {
            delete rMap[StaticResource::FBO_DIRECTIONAL_SHADOWS];
            rMap.erase(StaticResource::FBO_DIRECTIONAL_SHADOWS);
        }
        rMap[StaticResource::FBO_DIRECTIONAL_SHADOWS] = (new FrameBuffer(width, height))->depthTexture();
    }

    AbstractResource *StaticResourceFactory::CreateShader(const std::string &vertex, const std::string &fragment) {
        return (new Shader())->init(
                vertex,
                fragment,
                false);;
    }

}