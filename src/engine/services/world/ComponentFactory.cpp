#include "ComponentFactory.h"
#include "AbstractComponent.h"
#include "components/MovementComponent.h"
#include "../WorldService.h"
#include "../world/WorldRegistry.h"
#include "components/AtmosphereComponent.h"
#include "components/CameraComponent.h"
#include "components/CullingComponent.h"
#include "components/ColliderComponent.h"
#include "components/DecalComponent.h"
#include "components/LightComponent.h"
#include "components/LightProbeComponent.h"
#include "components/MeshComponent.h"
#include "components/SpriteComponent.h"
#include "components/RigidBodyComponent.h"
#include "components/TerrainComponent.h"

namespace PEngine {
    void ComponentFactory::addComponent(ComponentType &name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();
        if (!entityComponents.count(ent->getEntityId())) {
            entityComponents[ent->getEntityId()] = {};
        }
        entityComponents[ent->getEntityId()].push_back(name.name);

        if (name.name == ComponentType::MOVEMENT.name) {
            reg.emplace<MovementComponent>(entity);
        } else if (name.name == ComponentType::ATMOSPHERE.name) {
            reg.emplace<AtmosphereComponent>(entity);
        } else if (name.name == ComponentType::CAMERA.name) {
            reg.emplace<CameraComponent>(entity);
        } else if (name.name == ComponentType::CULLING.name) {
            reg.emplace<CullingComponent>(entity);
        } else if (name.name == ComponentType::COLLIDER.name) {
            reg.emplace<ColliderComponent>(entity);
        } else if (name.name == ComponentType::DECAL.name) {
            reg.emplace<DecalComponent>(entity);
        } else if (name.name == ComponentType::LIGHT.name) {
            reg.emplace<LightComponent>(entity);
        } else if (name.name == ComponentType::LIGHT_PROBE.name) {
            reg.emplace<LightProbeComponent>(entity);
        } else if (name.name == ComponentType::MESH_MATERIAL.name) {
            reg.emplace<MeshComponent>(entity);
        } else if (name.name == ComponentType::TERRAIN.name) {
            reg.emplace<TerrainComponent>(entity);
        } else if (name.name == ComponentType::SPRITE.name) {
            reg.emplace<SpriteComponent>(entity);
        } else if (name.name == ComponentType::RIGID_BODY.name) {
            reg.emplace<RigidBodyComponent>(entity);
        }

        AbstractComponent &component = getComponent(name, ent);
        component.entity = ent;
    }

    AbstractComponent &ComponentFactory::getComponent(ComponentType &name, Entity *ent) {
        entt::registry &reg = service->getRegistry()->getWorldReg();
        entt::entity entity = ent->getEntity();

        if (name.name == ComponentType::MOVEMENT.name) {
            return reg.get<MovementComponent>(entity);
        } else if (name.name == ComponentType::ATMOSPHERE.name) {
            return reg.get<AtmosphereComponent>(entity);
        } else if (name.name == ComponentType::CAMERA.name) {
            return reg.get<CameraComponent>(entity);
        } else if (name.name == ComponentType::CULLING.name) {
            return reg.get<CullingComponent>(entity);
        } else if (name.name == ComponentType::COLLIDER.name) {
            return reg.get<ColliderComponent>(entity);
        } else if (name.name == ComponentType::DECAL.name) {
            return reg.get<DecalComponent>(entity);
        } else if (name.name == ComponentType::LIGHT.name) {
            return reg.get<LightComponent>(entity);
        } else if (name.name == ComponentType::LIGHT_PROBE.name) {
            return reg.get<LightProbeComponent>(entity);
        } else if (name.name == ComponentType::MESH_MATERIAL.name) {
            return reg.get<MeshComponent>(entity);
        } else if (name.name == ComponentType::TERRAIN.name) {
            return reg.get<TerrainComponent>(entity);
        } else if (name.name == ComponentType::SPRITE.name) {
            return reg.get<SpriteComponent>(entity);
        } else if (name.name == ComponentType::RIGID_BODY.name) {
            return reg.get<RigidBodyComponent>(entity);
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
        } else if (name.name == ComponentType::ATMOSPHERE.name) {
            reg.erase<AtmosphereComponent>(entity);
        } else if (name.name == ComponentType::CAMERA.name) {
            reg.erase<CameraComponent>(entity);
        } else if (name.name == ComponentType::CULLING.name) {
            reg.erase<CullingComponent>(entity);
        } else if (name.name == ComponentType::COLLIDER.name) {
            reg.erase<ColliderComponent>(entity);
        } else if (name.name == ComponentType::DECAL.name) {
            reg.erase<DecalComponent>(entity);
        } else if (name.name == ComponentType::LIGHT.name) {
            reg.erase<LightComponent>(entity);
        } else if (name.name == ComponentType::LIGHT_PROBE.name) {
            reg.erase<LightProbeComponent>(entity);
        } else if (name.name == ComponentType::MESH_MATERIAL.name) {
            reg.erase<MeshComponent>(entity);
        } else if (name.name == ComponentType::TERRAIN.name) {
            reg.erase<TerrainComponent>(entity);
        } else if (name.name == ComponentType::SPRITE.name) {
            reg.erase<SpriteComponent>(entity);
        } else if (name.name == ComponentType::RIGID_BODY.name) {
            reg.erase<RigidBodyComponent>(entity);
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
