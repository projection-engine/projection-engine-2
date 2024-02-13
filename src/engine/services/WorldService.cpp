#include "WorldService.h"
#include "../../util/structures/Map.cpp"
#include "entt/entt.hpp"
#include "world/Entity.h"
#include "world/AbstractComponent.h"
#include "world/WorldRegistry.h"

namespace PEngine {
    void WorldService::removeEntity(std::uint32_t id) {
        worldRegistry->removeEntity(id);
    }

    Entity *WorldService::addEntity() {
        return worldRegistry->addEntity();
    }

    bool WorldService::hasEntity(std::uint32_t id) {
        return worldRegistry->hasEntity(id);

    }

    WorldRegistry *WorldService::getRegistry() {
        return worldRegistry;
    }

    void WorldService::addComponent(ComponentType &name, Entity *ent) {
        componentFactory.addComponent(name, ent);
    }

    WorldService::WorldService() {
        worldRegistry = new WorldRegistry;
        componentFactory.setService(this);
    }

    AbstractComponent &WorldService::getComponent(ComponentType &name, Entity *ent) {
        return componentFactory.getComponent(name, ent);
    }

    bool WorldService::hasComponent(ComponentType &name, Entity *ent) {
        return componentFactory.hasComponent(name, ent);
    }

    void WorldService::removeComponent(ComponentType &name, Entity *ent) {
        componentFactory.removeComponent(name, ent);
    }

    Entity *WorldService::getEntity(std::uint32_t id) {
        return worldRegistry->getEntity(id);
    }

    std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &WorldService::getParentChildren() {
        return worldRegistry->getParentChildren();
    }

    Entity &WorldService::getRoot() {
        return worldRegistry->getRoot();
    }

    std::vector<std::string> &WorldService::getComponentList(Entity *ent) {
        return componentFactory.getComponentList(ent);
    }

}
