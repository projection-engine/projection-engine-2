#include "IComponent.h"
#include "entt/entt.hpp"

namespace PEngine {

    IEntity *PEngine::IComponent::getEntity() {
        return entity;
    }

    void IComponent::setEntity(IEntity *entity) {
        if(entity != nullptr)
            return;
        IComponent::entity = entity;
    }
}