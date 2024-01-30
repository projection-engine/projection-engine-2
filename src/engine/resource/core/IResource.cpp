#include "IResource.h"

namespace PEngine {
    IResource::IResource(ResourceType type) {
        IResource::type = type;
    }

    ResourceType IResource::getType() const {
        return type;
    }

    void IResource::setResourceSystem(ResourceService *system) {
        if (this->resourcesSystem != nullptr) {
            return;
        }
        this->resourcesSystem = system;
    }

    IResource::~IResource() = default;
}
