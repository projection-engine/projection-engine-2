#ifndef PROJECTION_ENTITY_H
#define PROJECTION_ENTITY_H

#include <string>
#include "entt/entity/entity.hpp"
#include "glm/fwd.hpp"
#include "glm/detail/type_vec3.hpp"
#include "../../AbstractSerializable.h"

namespace PEngine {
    struct Entity : public AbstractSerializable {
        std::string name = "New Entity";
        bool active = true;
        glm::vec3 pickID;
        long pickIndex = -1;

        void initialize(entt::entity entity);

        entt::entity getEntity();

        std::uint32_t getEntityId();

        nlohmann::json serialize() override;

        void parse(nlohmann::json &data) override;
    private:
        bool initialized = false;
        entt::entity entity;
    };
}

#endif
