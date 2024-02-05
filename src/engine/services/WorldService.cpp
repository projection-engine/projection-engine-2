#include "WorldService.h"
#include "../../util/structures/Map.cpp"
#include "world/Entity.h"
#include "world/AbstractComponent.h"

namespace PEngine {
    void WorldService::removeEntity(std::uint32_t id) {
        if (!entities.count(id))
            return;
        CONSOLE_LOG("Removing entity")
        Entity &entity = entities.at(id);
        worldReg.destroy(entity.getEntity());
        entities.erase(id);
    }

    Entity *WorldService::addEntity() {
        entt::entity ent = worldReg.create();
        auto entId = static_cast<unsigned int>(ent);
        entities.emplace(entId, Entity());
        Entity &entity = entities.at(entId);
        entity.initialize(ent);

        auto parentId = static_cast<unsigned int>(root.getEntity());
        childParent[entId] = parentId;
        if (!parentChildren.count(parentId)) {
            parentChildren[parentId] = {};
        }
        parentChildren[parentId].push_back(entId);

        return &entity;
    }

    bool WorldService::hasEntity(std::uint32_t uuid) {
        return entities.count(uuid);
    }

    entt::registry &WorldService::getRegistry() {
        return worldReg;
    }

    void WorldService::addComponent(ComponentType name, Entity *ent) {
        componentFactory.addComponent(name, ent);
    }

    WorldService::WorldService() {
        componentFactory.setService(this);
        root.initialize(worldReg.create());
    }

    AbstractComponent &WorldService::getComponent(ComponentType name, Entity *ent) {
        return componentFactory.getComponent(name, ent);
    }

    bool WorldService::hasComponent(ComponentType name, Entity *ent) {
        return componentFactory.hasComponent(name, ent);
    }

    void WorldService::removeComponent(ComponentType name, Entity *ent) {
        componentFactory.removeComponent(name, ent);
    }

}