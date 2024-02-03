#include "glad/glad.h"
#include "ResourceService.h"
#include "../../util/structures/Map.cpp"
#include "resource/core/Mesh.h"

namespace PEngine {
    void ResourceService::registerResource(AbstractResource *resource, StaticResource id) {
        CONSOLE_WARN("Creating {0}", std::to_string(id))
        if (staticResources.has(id)) {
            CONSOLE_ERROR("Static util already exists {0}", std::to_string(id))
            return;
        }
        staticResources.set(id, resource);
    }

    bool ResourceService::hasResource(const std::string &id) {
        return dynamicResources.has(id);
    }

    bool ResourceService::hasResource(StaticResource id) {
        return staticResources.has(id);
    }

    void ResourceService::registerResource(AbstractResource *resource, const char *id) {
        CONSOLE_WARN("Creating {0}", id)
        if (dynamicResources.has(id)) {
            CONSOLE_ERROR("Dynamic util already exists {0}", id)
            return;
        }
        dynamicResources.set(id, resource);
    }

    void ResourceService::deleteResource(const std::string &id) {
        CONSOLE_WARN("Deleting {0}", id)
        if (!dynamicResources.has(id)) {
            CONSOLE_ERROR("Dynamic util doesn't exists {0}", id)
            return;
        }
        AbstractResource *pResource = dynamicResources.get(id);
        delete pResource;
        dynamicResources.deleteKey(id);
    }
}