#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "Entity.h"
#include "../../enum/ComponentType.h"
#include "glm/vec3.hpp"
#include "glm/vec4.hpp"
#include "glm/detail/type_mat4x4.hpp"
#include "glm/detail/type_mat3x3.hpp"

namespace PEngine {
    struct AbstractComponent : public AbstractSerializable {
        Entity *entity = nullptr;

        virtual nlohmann::json serialize();

        ComponentType &componentType;

        explicit AbstractComponent(ComponentType &type) : componentType(type) {}

        nlohmann::json Dump(glm::vec2 &vec);

        nlohmann::json Dump(glm::vec3 &vec);

        nlohmann::json Dump(glm::vec4 &vec);

        nlohmann::json Dump(glm::mat4 &mat);

        nlohmann::json Dump(glm::mat3 &mat);

        void ParseInto(nlohmann::json &json, glm::mat3 &mat);

        void ParseInto(nlohmann::json &json, glm::mat4 &mat);

        void ParseInto(nlohmann::json &json, glm::vec2 &vec);

        void ParseInto(nlohmann::json &json, glm::vec3 &vec);

        void ParseInto(nlohmann::json &json, glm::vec4 &vec);
    };
}
#endif
