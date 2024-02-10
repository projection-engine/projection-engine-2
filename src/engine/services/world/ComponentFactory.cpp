#include "ComponentFactory.h"
#include "AbstractComponent.h"
#include "components/MovementComponent.h"
#include "../WorldService.h"
#include "../world/WorldRegistry.h"

namespace PEngine {
    void ComponentFactory::addComponent(ComponentType name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();
        if (!entityComponents.count(ent->getEntityId())) {
            entityComponents[ent->getEntityId()] = {};
        }
        entityComponents[ent->getEntityId()].push_back(name);
        switch (name) {
            case MOVEMENT: {
                reg.emplace<MovementComponent>(entity);
                break;
            }
        }
        AbstractComponent &component = getComponent(name, ent);
        component.entity = ent;
    }

    AbstractComponent &ComponentFactory::getComponent(ComponentType name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();

        switch (name) {
            case MOVEMENT: {
                return (AbstractComponent &) reg.get<MovementComponent>(entity);
            }
        }
        throw std::invalid_argument("Component not present on entity");
    }

    void ComponentFactory::setService(WorldService *s) {
        this->service = s;
    }

    void ComponentFactory::removeComponent(ComponentType name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();

        if (entityComponents.count(ent->getEntityId())) {
            std::vector<ComponentType> &list = entityComponents[ent->getEntityId()];
            list.erase(std::remove(list.begin(), list.end(), name), list.end());
        }

        switch (name) {
            case MOVEMENT: {
                reg.erase<MovementComponent>(entity);
                break;
            }
        }
    }

        bool ComponentFactory::hasComponent(ComponentType name, Entity *ent) {
        std::vector<ComponentType> vec = entityComponents[ent->getEntityId()];
        return std::find(vec.begin(), vec.end(), name) != vec.end();
    }

    std::vector<ComponentType> ComponentFactory::getComponentList(Entity *ent) {
        if (entityComponents.count(ent->getEntityId())) {
            return entityComponents[ent->getEntityId()];
        }
        return {};
    }
}