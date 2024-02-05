#ifndef PROJECTION_ENTITY_H
#define PROJECTION_ENTITY_H

#include <string>
#include "entt/entity/entity.hpp"
#include "glm/fwd.hpp"
#include "glm/detail/type_vec3.hpp"

namespace PEngine {
    class Entity {
    private:
        bool initialized = false;
        entt::entity entity;
        glm::ivec3 colorIdentifier = glm::ivec3(255, 255, 255);
        std::string name = "New Entity";
        glm::vec3 pickID;
        long pickIndex = -1;
        bool active = true;
    public:
        void initialize(entt::entity entity);

        entt::entity getEntity();

        const glm::ivec3 &getColorIdentifier() const;

        void setColorIdentifier(const glm::ivec3 &colorIdentifier);

        const std::string &getName() const;

        void setName(const std::string &name);

        const glm::vec3 &getPickId() const;

        void setPickId(const glm::vec3 &pickId);

        long getPickIndex() const;

        void setPickIndex(long pickIndex);

        bool isActive() const;

        void setActive(bool active);
    };
}

#endif
