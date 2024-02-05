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

        auto parentId = static_cast<unsigned int>(root.getEntity());
        childParent[entId] = parentId;
        if (!parentChildren.count(parentId)) {
            parentChildren[parentId] = {};
        }
        parentChildren[parentId].push_back(entId);

        return &entity;
    }

    bool WorldRegistry::hasEntity(std::uint32_t uuid) {
        return entities.count(uuid);
    }
}