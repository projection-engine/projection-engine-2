#ifndef PROJECTION_ENTITY_H
#define PROJECTION_ENTITY_H

#include <string>
#include "entt/entity/entity.hpp"

namespace PEngine {
    class Entity {
    private:
        entt::entity entity;
    public:
        explicit Entity(entt::entity entity);

        entt::entity getEntity();
    };
}

#endif
