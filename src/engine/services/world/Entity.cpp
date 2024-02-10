#include "Entity.h"

namespace PEngine {
    entt::entity Entity::getEntity() {
        return entity;
    }

    Entity::Entity(entt::entity entity) {
        this->entity = entity;
    }
}