
#include "IComponent.h"

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