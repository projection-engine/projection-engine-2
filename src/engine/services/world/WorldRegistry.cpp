#include "WorldRegistry.h"

namespace PEngine {
    WorldRegistry::WorldRegistry() {
        root.initialize(worldReg.create());
    }

     entt::registry &WorldRegistry::getWorldReg()  {
        return worldReg;
    }

     Entity &WorldRegistry::getRoot()  {
        return root;
    }

    void WorldRegistry::removeEntity(std::uint32_t id) {
        if (!entities.count(id))
            return;
        Entity &entity = entities.at(id);
        worldReg.destroy(entity.getEntity());
        entities.erase(id);
    }

    Entity *WorldRegistry::addEntity() {
        entt::entity ent = worldReg.create();
        auto entId = static_cast<unsigned int>(ent);
        entities.emplace(entId, Entity());
        Entity &entity = entities.at(entId);
        entity.initialize(ent);

        std::uint32_t rootId = root.getEntityId();
        childParent[entId] = rootId;
        if (!parentChildren.count(rootId)) {
            parentChildren[rootId] = {};
        }
        parentChildren[rootId].push_back(entId);

        return &entity;
    }

    bool WorldRegistry::hasEntity(std::uint32_t id) {
        return entities.count(id);
    }

    Entity *WorldRegistry::getEntity(uint32_t id) {
        if(hasEntity(id)) {
            return &entities[id];
        }
        return nullptr;
    }

    std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &WorldRegistry::getParentChildren() {
        return parentChildren;
    }
}