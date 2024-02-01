#include "glad/glad.h"
#include "ResourceService.h"
#include "../../util/structures/Map.cpp"
#include "../resource/core/RMesh.h"

namespace PEngine {
    void ResourceService::registerResource(IResource *resource, StaticResource id) {
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

    void ResourceService::registerResource(IResource *resource, const char *id) {
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
        IResource *pResource = dynamicResources.get(id);
        delete pResource;
        dynamicResources.deleteKey(id);
    }

    void ResourceService::deleteResource(StaticResource id) {
        CONSOLE_WARN("Deleting {0}", std::to_string(id))
        if (!staticResources.has(id)) {
            CONSOLE_ERROR("Static util doesn't exists {0}", std::to_string(id))
            return;
        }
        IResource *pResource = staticResources.get(id);
        delete pResource;
        staticResources.deleteKey(id);
    }

    void ResourceService::createTexture(
            unsigned int *target,
            unsigned int width,
            unsigned int height,
            unsigned int internalFormat,
            unsigned int border,
            unsigned int format,
            unsigned int type,
            unsigned int minFilter,
            unsigned int magFilter,
            unsigned int wrapS,
            unsigned int wrapT,
            unsigned char *data
    ) {
        glGenTextures(1, target);
        glBindTexture(GL_TEXTURE_2D, *target);
        glTexImage2D(GL_TEXTURE_2D, 0, internalFormat, width, height, border, format, type, data);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, magFilter);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, minFilter);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT);
        glBindTexture(GL_TEXTURE_2D, 0);
    }

    void ResourceService::createBuffer(
            unsigned int *target,
            unsigned int type,
            std::vector<float> &data,
            unsigned int renderingType
    ) {
        glGenBuffers(1, target);
        glBindBuffer(type, *target);
        glBufferData(type, data.size() * sizeof(float), &data[0], renderingType);
    }

}