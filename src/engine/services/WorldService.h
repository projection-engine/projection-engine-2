#pragma once
#ifndef PROJECTION_WORLDSERVICE_H
#define PROJECTION_WORLDSERVICE_H

#include "AbstractCoreService.h"
#include "../enum/ComponentType.h"
#include "world/ComponentFactory.h"
#include <unordered_map>


namespace PEngine {
    class AbstractComponent;

    class WorldRegistry;

    class WorldService : public AbstractCoreService {
    private:
        ComponentFactory componentFactory;
        WorldRegistry *worldRegistry = nullptr;

    public:

        explicit WorldService();

        Entity *addEntity();

        void removeEntity(std::uint32_t id);

        void addComponent(ComponentType name, Entity *ent);

        void removeComponent(ComponentType name, Entity *ent);

        AbstractComponent &getComponent(ComponentType name, Entity *ent);

        bool hasComponent(ComponentType name, Entity *ent);

        bool hasEntity(std::uint32_t id);

        WorldRegistry *getRegistry();
    };
}

#endif
