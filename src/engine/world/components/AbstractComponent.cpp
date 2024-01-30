#include "AbstractComponent.h"
#include "entt/entt.hpp"

namespace PEngine {

    AbstractEntity *PEngine::AbstractComponent::getEntity() {
        return entity;
    }

    void AbstractComponent::setEntity(AbstractEntity *entity) {
        if(entity != nullptr)
            return;
        AbstractComponent::entity = entity;
    }
}