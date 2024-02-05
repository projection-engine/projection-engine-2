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

    const glm::ivec3 &Entity::getColorIdentifier() const {
        return colorIdentifier;
    }

    void Entity::setColorIdentifier(const glm::ivec3 &c) {
        Entity::colorIdentifier = c;
    }

    const std::string &Entity::getName() const {
        return name;
    }

    void Entity::setName(const std::string &n) {
        Entity::name = n;
    }

    const glm::vec3 &Entity::getPickId() const {
        return pickID;
    }

    void Entity::setPickId(const glm::vec3 &pickId) {
        pickID = pickId;
    }

    long Entity::getPickIndex() const {
        return pickIndex;
    }

    void Entity::setPickIndex(long pickIndex) {
        Entity::pickIndex = pickIndex;
    }

    bool Entity::isActive() const {
        return active;
    }

    void Entity::setActive(bool active) {
        Entity::active = active;
    }
}