#include "glad/glad.h"
#include "ResourceService.h"
#include "../../util/structures/Map.cpp"
#include "resource/core/Mesh.h"
#include "resource/core/Shader.h"
#include "../enum/StaticShader.h"
#include "resource/StaticMeshFactory.h"
#include "resource/StaticFBOFactory.h"
#include "resource/StaticTextureFactory.h"
#include "resource/StaticShaderFactory.h"
#include "resource/StaticUBOFactory.h"
#include "../Engine.h"

namespace PEngine {
    bool ResourceService::hasResource(const std::string &id) {
        return dynamicResources.count(id);
    }

    bool ResourceService::hasResource(StaticResource id) {
        return staticResources.count(id);
    }

    void ResourceService::registerResource(AbstractResource *resource, const char *id) {
        CONSOLE_WARN("Creating {0}", id)
        if (dynamicResources.count(id)) {
            CONSOLE_ERROR("Dynamic util already exists {0}", id)
            return;
        }
        dynamicResources[id] = resource;
    }

    void ResourceService::deleteResource(const std::string &id) {
        CONSOLE_WARN("Deleting {0}", id)
        if (!dynamicResources.count(id)) {
            CONSOLE_ERROR("Dynamic util doesn't exists {0}", id)
            return;
        }
        AbstractResource *pResource = dynamicResources[id];
        delete pResource;
        dynamicResources.erase(id);
    }

    ResourceService::ResourceService() {
        GenerateStaticUBOs(staticResources);
        GenerateStaticShaders(staticResources);
        GenerateStaticFBOs(engine->getViewportWidth(), engine->getViewportHeight(), staticResources);
        GenerateNoiseTexture(staticResources);
        GenerateStaticMeshes(engine->getFs(), staticResources);
    }
}