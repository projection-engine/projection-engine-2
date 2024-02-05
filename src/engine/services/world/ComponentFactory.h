#ifndef PROJECTION_COMPONENTFACTORY_H
#define PROJECTION_COMPONENTFACTORY_H

#include <unordered_map>
#include <functional>
#include "../../enum/ComponentType.h"

namespace PEngine {
    class AbstractComponent;

    class Entity;

    class WorldService;

    class ComponentFactory {
        WorldService *service = nullptr;
    public:
        void setService(WorldService *service);

        void addComponent(ComponentType name, Entity *ent);

        AbstractComponent &getComponent(ComponentType name, Entity *ent);

        void removeComponent(ComponentType name, Entity *ent);

        bool hasComponent(ComponentType name, Entity *ent);
    };

}

#endif
