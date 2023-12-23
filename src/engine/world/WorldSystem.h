#pragma once
#ifndef PROJECTION_WORLDSYSTEM_H
#define PROJECTION_WORLDSYSTEM_H

#include "entt/entt.hpp"
#include "../../util/debug/ILoggable.h"
#include "../../util/structures/Map.h"
#include "components/IComponent.h"

namespace PEngine {
    /**
     * For manipulating data
     * */

    class IEntity;

    class WorldSystem : public ILoggable {
    private:
        entt::registry worldReg;
        Map<std::string, IEntity *> entities;

        IEntity *addEntityInternal(const std::string& uuid, const char *name);

        static entt::entity getEntityFromWrapper(IEntity *entity);

    public:

        IEntity *addEntity();

        void removeEntity(const std::string &uuid);

        template<class T>
        IComponent &addComponent(IEntity *ent) {
            CONSOLE_LOG("Adding component to entity")
            entt::entity entity = getEntityFromWrapper(ent);
            worldReg.emplace<T>(entity);
            IComponent &comp = worldReg.get<T>(entity);
            comp.setEntity(ent);
            return comp;
        }

        template<class T>
        void removeComponent(IEntity *ent) {
            CONSOLE_LOG("Removing component from entity")
            entt::entity entity = getEntityFromWrapper(ent);
            worldReg.erase<T>(entity);
        }

        template<class T>
        IComponent *getComponent(IEntity *ent) {
            entt::entity entity = getEntityFromWrapper(ent);
            return worldReg.try_get<T>(entity);
        }

        template<class T>
        bool hasComponent(IEntity *ent) {
            entt::entity entity = getEntityFromWrapper(ent);
            return worldReg.all_of<T>(entity);
        }

        bool hasEntity(const std::string &uuid);

        entt::registry &getRegistry();

        IEntity *addEntity(std::string name);
    };
}

#endif
