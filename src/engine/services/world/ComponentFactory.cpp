#include "ComponentFactory.h"
#include "AbstractComponent.h"
#include "components/MovementComponent.h"
#include "../WorldService.h"
#include "../world/WorldRegistry.h"

namespace PEngine {
    void ComponentFactory::addComponent(ComponentType &name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();
        if (!entityComponents.count(ent->getEntityId())) {
            entityComponents[ent->getEntityId()] = {};
        }
        entityComponents[ent->getEntityId()].push_back(name);
        if (name.name == ComponentType::MOVEMENT.name) {
            reg.emplace<MovementComponent>(entity);
        }

        AbstractComponent &component = getComponent(name, ent);
        component.entity = ent;
    }

    AbstractComponent &ComponentFactory::getComponent(ComponentType &name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();

        if (name.name == ComponentType::MOVEMENT.name) {
            return (AbstractComponent &) reg.get<MovementComponent>(entity);
        }
        throw std::invalid_argument("Component not present on entity");
    }

    void ComponentFactory::setService(WorldService *s) {
        this->service = s;
    }

    void ComponentFactory::removeComponent(ComponentType &name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();

        if (entityComponents.count(ent->getEntityId())) {
            std::vector<std::string> &list = entityComponents[ent->getEntityId()];
            list.erase(std::remove(list.begin(), list.end(), name.name), list.end());
        }

        if (name.name == ComponentType::MOVEMENT.name) {
            reg.erase<MovementComponent>(entity);
        }

    }

    bool ComponentFactory::hasComponent(ComponentType &name, Entity *ent) {
        std::vector<std::string> vec = entityComponents[ent->getEntityId()];
        return std::find(vec.begin(), vec.end(), name.name) != vec.end();
    }

    std::vector<std::string> &ComponentFactory::getComponentList(Entity *ent) {
        if (!entityComponents.count(ent->getEntityId())) {
            entityComponents[ent->getEntityId()] = {};
        }
        return entityComponents[ent->getEntityId()];
    }
}
