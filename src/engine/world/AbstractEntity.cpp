#include "AbstractEntity.h"

#include <utility>

namespace PEngine {
    const std::string &AbstractEntity::getName() const {
        return name;
    }

    void AbstractEntity::setName(std::string name) {
        AbstractEntity::name = std::move(name);
    }

    const std::string &AbstractEntity::getUUID() const {
        return uuid;
    }

    entt::entity AbstractEntity::getEntity() {
        return entity;
    }

    AbstractEntity::AbstractEntity(entt::entity entity, std::string uuid) {
        this->uuid = std::move(uuid);
        this->entity = entity;
    }
}