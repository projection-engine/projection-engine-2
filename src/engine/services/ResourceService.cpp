#include "glad/glad.h"
#include "ResourceService.h"
#include "../../util/structures/Map.cpp"
#include "resource/core/Mesh.h"
#include "resource/core/Shader.h"
#include "../enum/StaticShader.h"
#include "resource/StaticResourceFactory.h"

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
        StaticResourceFactory::InitializeShaders(staticResources);
        StaticResourceFactory::InitializeFBOs(staticResources);
        StaticResourceFactory::InitializeMeshes(staticResources);
    }
}