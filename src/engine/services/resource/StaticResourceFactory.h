#ifndef PROJECTION_STATICRESOURCEFACTORY_H
#define PROJECTION_STATICRESOURCEFACTORY_H

#include <unordered_map>
#include <string>
#include "../../enum/StaticResource.h"
#include "dto/FBOTextureDTO.h"

namespace PEngine {
    class AbstractResource;

    class StaticResourceFactory {
        static AbstractResource *CreateShader(const std::string &vertex, const std::string &fragment);

    public:
        static void InitializeShaders(std::unordered_map<StaticResource, AbstractResource *> &rMap);

        static void InitializeFBOs(int width, int height, std::unordered_map<StaticResource, AbstractResource *> &rMap);

        static void InitializeMeshes(std::unordered_map<StaticResource, AbstractResource *> &rMap);

        static void GenerateDirectionalShadowsFBO(int width, int height,
                                                  std::unordered_map<StaticResource, AbstractResource *> &rMap);

        static void GenerateBlurBuffer(
                int &w,
                int &h,
                float multiplier,
                std::unordered_map<StaticResource, AbstractResource *> &rMap,
                FBOTextureDTO &linearTexture, StaticResource name);

        void InitializeUBOs(std::unordered_map<StaticResource, AbstractResource *> &rMap);

        void GenerateNoiseTexture(std::unordered_map<StaticResource, AbstractResource *> &rMap);
    };

}

#endif
