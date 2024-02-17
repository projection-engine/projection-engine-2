#ifndef PROJECTION_COLLIDERCOMPONENT_H
#define PROJECTION_COLLIDERCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"
#include "../../../enum/ColliderType.h"

namespace PEngine {

    struct ColliderComponent : public AbstractComponent {
        glm::vec3 center = glm::vec3(0, 0, 0);
        glm::vec3 size = glm::vec3(1, 1, 1);
        std::string collisionType = ColliderType::BOX;
        float height = 1;
        float radius = 1;
        bool initialized = false;

        explicit ColliderComponent() : AbstractComponent(ComponentType::COLLIDER) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["collisionType"] = collisionType;
            json["height"] = height;
            json["radius"] = radius;
            json["initialized"] = initialized;
            json["center"] = Dump(center);
            json["size"] = Dump(size);
            return json;
        }

        void parse(nlohmann::json &data) override {
            collisionType = data["collisionType"];
            height = data["height"];
            radius = data["radius"];
            initialized = data["initialized"];
            ParseInto(data["center"], center);
            ParseInto(data["size"], size);
        }
    };

}

#endif
