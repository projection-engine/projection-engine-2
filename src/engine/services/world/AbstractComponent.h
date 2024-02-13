#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "Entity.h"
#include "../../enum/ComponentType.h"

namespace PEngine {
    struct AbstractComponent : public AbstractSerializable {
        Entity *entity = nullptr;

        virtual nlohmann::json serialize() override;

        ComponentType &componentType;

        explicit AbstractComponent(ComponentType &type) : componentType(type) {}

        void dump(nlohmann::json &json, glm::vec2 &vec);

        void dump(nlohmann::json &json, glm::vec3 &vec);

        void dump(nlohmann::json &json, glm::vec4 &vec);

        void dump(nlohmann::json &json, glm::mat4 &vec);

        void dump(nlohmann::json &json, glm::mat3 &vec);
    };
}
#endif
