#include "Entity.h"

namespace PEngine {
    entt::entity Entity::getEntity() {
        return entity;
    }

    void Entity::initialize(entt::entity e) {
        if(initialized){
            return;
        }
        initialized = true;
        this->entity = e;
    }

    std::uint32_t Entity::getEntityId() {
        return static_cast<uint32_t>(entity);
    }
}