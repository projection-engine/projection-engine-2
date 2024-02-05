#pragma once
#ifndef PROJECTION_WORLDSERVICE_H
#define PROJECTION_WORLDSERVICE_H

#include "entt/entt.hpp"
#include "AbstractCoreService.h"
#include "../enum/ComponentType.h"
#include "world/ComponentFactory.h"
#include "world/Entity.h"
#include <unordered_map>

namespace PEngine {
    class AbstractComponent;

    class WorldService : public AbstractCoreService {
    private:
        ComponentFactory componentFactory;
        entt::registry worldReg;
        Entity root;
        std::unordered_map<std::uint32_t, Entity> entities;
        std::unordered_map<std::uint32_t, std::uint32_t> childParent;
        std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> parentChildren;

    public:

        explicit WorldService();

        Entity *addEntity();

        void removeEntity(std::uint32_t id);

        void addComponent(ComponentType name, Entity *ent);

        void removeComponent(ComponentType name, Entity *ent);

        AbstractComponent &getComponent(ComponentType name, Entity *ent);

        bool hasComponent(ComponentType name, Entity *ent);

        bool hasEntity(std::uint32_t id);

        entt::registry &getRegistry();
    };
}

#endif
