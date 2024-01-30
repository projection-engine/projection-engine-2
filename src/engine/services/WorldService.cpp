#include "WorldService.h"
#include "structures/Map.cpp"

namespace PEngine {
    void WorldService::removeEntity(const std::string &uuid) {
        if (!entities.has(uuid))
            return;
        CONSOLE_LOG("Removing entity")
        AbstractEntity *entity = entities.get(uuid);
        worldReg.destroy(entity->getEntity());
        entities.deleteKey(uuid);
        delete entity;
    }

    AbstractEntity *WorldService::addEntity() {
        CONSOLE_LOG("Creating entity")
        return addEntityInternal(UUID::v4(), nullptr);
    }

    AbstractEntity *WorldService::addEntity(std::string name) {
        CONSOLE_LOG("Creating entity {0}", name)
        return addEntityInternal(UUID::v4(), name.c_str());
    }

    entt::entity WorldService::getEntityFromWrapper(AbstractEntity *entity) {
        return entity->getEntity();
    }

    AbstractEntity *WorldService::addEntityInternal(const std::string& uuid, const char *name) {
        auto *pEntity = new AbstractEntity(worldReg.create(), uuid);
        entities.set(uuid, pEntity);
        if(name != nullptr) {
            pEntity->setName(name);
        }
        return pEntity;
    }

    bool WorldService::hasEntity(const std::string &uuid) {
        return entities.has(uuid);
    }

    entt::registry &WorldService::getRegistry() {
        return worldReg;
    }

}