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

        Entity *getEntity(std::uint32_t id);

        void removeEntity(std::uint32_t id);

        void addComponent(ComponentType &name, Entity *ent);

        void removeComponent(ComponentType &name, Entity *ent);

        AbstractComponent &getComponent(ComponentType &name, Entity *ent);

        bool hasComponent(ComponentType &name, Entity *ent);

        bool hasEntity(std::uint32_t id);

        WorldRegistry *getRegistry();

        std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &getParentChildren();

        Entity &getRoot();

        std::vector<std::string> &getComponentList(Entity *ent);
    };
}

#endif
