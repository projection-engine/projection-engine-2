#ifndef PROJECTION_WORLDREGISTRY_H
#define PROJECTION_WORLDREGISTRY_H

#include <unordered_map>
#include "entt/entity/registry.hpp"
#include "Entity.h"

namespace PEngine {

    class WorldRegistry {
        entt::registry worldReg;
        Entity root;
        std::unordered_map<std::uint32_t, Entity> entities;
        std::unordered_map<std::uint32_t, std::uint32_t> childParent;
        std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> parentChildren;

    public:
        explicit WorldRegistry();

        entt::registry &getWorldReg();

        Entity &getRoot();

        void removeEntity(uint32_t id);

        Entity *addEntity();

        bool hasEntity(uint32_t id);

        Entity *getEntity(uint32_t id);

        std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &getParentChildren();
    };

}

#endif
