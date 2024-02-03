#include "glad/glad.h"
#include "StaticFBOFactory.h"
#include "dto/FBOTextureDTO.h"
#include "core/FrameBuffer.h"

namespace PEngine {

    void GenerateDirectionalShadowsFBO(
            int width,
            int height,
            std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        if (rMap.count(StaticResource::FBO_DIRECTIONAL_SHADOWS)) {
            delete rMap[StaticResource::FBO_DIRECTIONAL_SHADOWS];
            rMap.erase(StaticResource::FBO_DIRECTIONAL_SHADOWS);
        }
        rMap[StaticResource::FBO_DIRECTIONAL_SHADOWS] = (new FrameBuffer(width, height))->depthTexture();
    }

    void GenerateBlurBuffer(
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

    void GenerateStaticFBOs(int width, int height,
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

}