#include "WorldService.h"
#include "../../util/structures/Map.cpp"
#include "world/Entity.h"
#include "world/AbstractComponent.h"

namespace PEngine {
    void WorldService::removeEntity(std::uint32_t id) {
        if (!entities.has(id))
            return;
        CONSOLE_LOG("Removing entity")
        Entity *entity = entities.get(id);
        worldReg.destroy(entity->getEntity());
        entities.deleteKey(id);
        delete entity;
    }

    Entity *WorldService::addEntity() {
        auto *pEntity = new Entity(worldReg.create());
        entities.set(static_cast<unsigned int>(pEntity->getEntity()), pEntity);
        return pEntity;
    }

    bool WorldService::hasEntity(std::uint32_t uuid) {
        return entities.has(uuid);
    }

    entt::registry &WorldService::getRegistry() {
        return worldReg;
    }

    void WorldService::addComponent(ComponentType name, Entity *ent) {
        componentFactory.addComponent(name, ent);
    }

    WorldService::WorldService() {
        componentFactory.setService(this);
    }

    AbstractComponent &WorldService::getComponent(ComponentType name, Entity *ent) {
        return componentFactory.getComponent(name, ent);
    }

    bool WorldService::hasComponent(ComponentType name, Entity *ent) {
        try {
            getComponent(name, ent);
            return true;
        } catch (std::invalid_argument &ex) {
            return false;
        }
    }

    void WorldService::removeComponent(ComponentType name, Entity *ent) {
        componentFactory.removeComponent(name, ent);
    }

}