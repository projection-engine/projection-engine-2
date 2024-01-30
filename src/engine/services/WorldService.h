#pragma once
#ifndef PROJECTION_WORLDSERVICE_H
#define PROJECTION_WORLDSERVICE_H

#include "entt/entt.hpp"
#include "debug/ILoggable.h"
#include "structures/Map.h"
#include "../world/components/AbstractComponent.h"
#include "AbstractCoreService.h"

namespace PEngine {

    class AbstractEntity;

    class WorldService : public AbstractCoreService {
    private:
        entt::registry worldReg;
        Map<std::string, AbstractEntity *> entities;

        AbstractEntity *addEntityInternal(const std::string& uuid, const char *name);

        static entt::entity getEntityFromWrapper(AbstractEntity *entity);

    public:

        AbstractEntity *addEntity();

        void removeEntity(const std::string &uuid);

        template<class T>
        AbstractComponent &addComponent(AbstractEntity *ent) {
            CONSOLE_LOG("Adding component to entity")
            entt::entity entity = getEntityFromWrapper(ent);
            worldReg.emplace<T>(entity);
            AbstractComponent &comp = worldReg.get<T>(entity);
            comp.setEntity(ent);
            return comp;
        }

        template<class T>
        void removeComponent(AbstractEntity *ent) {
            CONSOLE_LOG("Removing component from entity")
            entt::entity entity = getEntityFromWrapper(ent);
            worldReg.erase<T>(entity);
        }

        template<class T>
        AbstractComponent *getComponent(AbstractEntity *ent) {
            entt::entity entity = getEntityFromWrapper(ent);
            return worldReg.try_get<T>(entity);
        }

        template<class T>
        bool hasComponent(AbstractEntity *ent) {
            entt::entity entity = getEntityFromWrapper(ent);
            return worldReg.all_of<T>(entity);
        }

        bool hasEntity(const std::string &uuid);

        entt::registry &getRegistry();

        AbstractEntity *addEntity(std::string name);
    };
}

#endif
