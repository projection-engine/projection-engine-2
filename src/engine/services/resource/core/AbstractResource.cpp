#include "AbstractResource.h"
#include "../../ResourceService.h"
#include "../../../Engine.h"

namespace PEngine {
    AbstractResource::AbstractResource(ResourceType type) {
        AbstractResource::type = type;
    }

    ResourceType AbstractResource::getType() const {
        return type;
    }

    void AbstractResource::setResourceSystem(ResourceService *system) {
        this->resourcesSystem = system;
        this->fs = system->getEngine()->getFs();
    }

    AbstractResource::~AbstractResource() = default;
}
