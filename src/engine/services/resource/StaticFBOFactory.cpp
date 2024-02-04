#include "glad/glad.h"
#include "StaticFBOFactory.h"
#include "dto/FBOTextureDTO.h"
#include "core/FrameBuffer.h"
#include "../ResourceService.h"

namespace PEngine {

    void GenerateDirectionalShadowsFBO(ResourceService *service, int width, int height) {
        if (service->hasResource(StaticResource::FBO_DIRECTIONAL_SHADOWS)) {
            service->deleteResource(StaticResource::FBO_DIRECTIONAL_SHADOWS);
        }
        service->createResource<FrameBuffer>(StaticResource::FBO_DIRECTIONAL_SHADOWS)
                ->setResolution(width, height)
                ->depthTexture();
    }

    void GenerateBlurBuffer(
            ResourceService *service,
            int &w,
            int &h,
            float multiplier,
            FBOTextureDTO &linearTexture,
            StaticResource name) {
        w *= multiplier;
        h *= multiplier;
        service->createResource<FrameBuffer>(name)
                ->setResolution(w, h)
                ->texture(linearTexture);
    }

    void GenerateStaticFBOs(ResourceService *service, int width, int height) {
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

        service->createResource<FrameBuffer>(StaticResource::FBO_GIZMO)
                ->setResolution(width, height)
                ->texture(gizmo)
                ->depthTest();
        service->createResource<FrameBuffer>(StaticResource::FBO_VISIBILITY)
                ->setResolution(width, height)
                ->texture(visibilityA)
                ->texture(visibilityB)
                ->depthTest();
        service->createResource<FrameBuffer>(StaticResource::FBO_POST_PROCESSING_1)
                ->setResolution(width, height)
                ->texture(defaultSettings);
        service->createResource<FrameBuffer>(StaticResource::FBO_POST_PROCESSING_2)
                ->setResolution(width, height)
                ->texture(defaultSettings)
                ->depthTest();
        service->createResource<FrameBuffer>(StaticResource::FBO_LENS)
                ->setResolution(width, height)
                ->texture(defaultSettings);
        service->createResource<FrameBuffer>(StaticResource::FBO_SSGI)
                ->setResolution(halfResW, halfResH)
                ->texture(linearTexture);
        service->createResource<FrameBuffer>(StaticResource::FBO_SSGI_FALLBACK)
                ->setResolution(halfResW, halfResH)
                ->texture(linearTexture);
        service->createResource<FrameBuffer>(StaticResource::FBO_SSAO)
                ->setResolution(halfResW, halfResH)
                ->texture(ssao);
        service->createResource<FrameBuffer>(StaticResource::FBO_SSAO_BLURRED)
                ->setResolution(halfResW, halfResH)
                ->texture(ssao);


        int w = width;
        int h = height;
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_1);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_2);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_3);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_4);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_5);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_6);
        GenerateBlurBuffer(service, w, h, 0.5, linearTexture, StaticResource::FBO_DOWNSCALE_7);
        GenerateBlurBuffer(service, w, h, 4, linearTexture, StaticResource::FBO_UPSCALE_1);
        GenerateBlurBuffer(service, w, h, 4, linearTexture, StaticResource::FBO_UPSCALE_2);

        GenerateDirectionalShadowsFBO(service, width, height);

    }

}