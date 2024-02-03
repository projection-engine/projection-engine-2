#pragma once
#ifndef PROJECTION_WORLDSERVICE_H
#define PROJECTION_WORLDSERVICE_H

#include "entt/entt.hpp"
#include "../../util/debug/ILoggable.h"
#include "../../util/structures/Map.h"
#include "AbstractCoreService.h"
#include "../enum/ComponentType.h"
#include "world/ComponentFactory.h"

namespace PEngine {

    class Entity;

    class AbstractComponent;

    class WorldService : public AbstractCoreService {
    private:
        ComponentFactory componentFactory;
        entt::registry worldReg;
        Map<std::uint32_t, Entity *> entities;

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
