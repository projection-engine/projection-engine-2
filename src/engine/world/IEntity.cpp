#include "IEntity.h"

#include <utility>

namespace PEngine {
    const std::string &IEntity::getName() const {
        return name;
    }

    void IEntity::setName(std::string name) {
        IEntity::name = std::move(name);
    }

    const std::string &IEntity::getUUID() const {
        return uuid;
    }

    entt::entity IEntity::getEntity() {
        return entity;
    }

    IEntity::IEntity(entt::entity entity, std::string uuid) {
        this->uuid = std::move(uuid);
        this->entity = entity;
    }
}