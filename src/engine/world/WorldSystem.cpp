#include "WorldSystem.h"
#include "IEntity.h"
#include "../../core/structures/Map.cpp"

namespace PEngine {
    void WorldSystem::removeEntity(const std::string &uuid) {
        if (!entities.has(uuid))
            return;
        CONSOLE_LOG("Removing entity")
        IEntity *entity = entities.get(uuid);
        worldReg.destroy(entity->getEntity());
        entities.deleteKey(uuid);
        delete entity;
    }

    IEntity *WorldSystem::addEntity() {
        CONSOLE_LOG("Creating entity")
        return addEntityInternal(UUID::v4(), nullptr);
    }

    IEntity *WorldSystem::addEntity(std::string name) {
        CONSOLE_LOG("Creating entity {0}", name)
        return addEntityInternal(UUID::v4(), name.c_str());
    }

    entt::entity WorldSystem::getEntityFromWrapper(IEntity *entity) {
        return entity->getEntity();
    }

    IEntity *WorldSystem::addEntityInternal(const std::string& uuid, const char *name) {
        auto *pEntity = new IEntity(worldReg.create(), uuid);
        entities.set(uuid, pEntity);
        if(name != nullptr) {
            pEntity->setName(name);
        }
        return pEntity;
    }

    bool WorldSystem::hasEntity(const std::string &uuid) {
        return entities.has(uuid);
    }

    entt::registry &WorldSystem::getRegistry() {
        return worldReg;
    }

}