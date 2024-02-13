
#ifndef PROJECTION_RIGIDBODYCOMPONENT_H
#define PROJECTION_RIGIDBODYCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"

namespace PEngine {

    struct RigidBodyComponent : public AbstractComponent {
        glm::vec3 inertia = glm::vec3(0, 0, 0);
        float mass = 1;
        float drag = 0;

        explicit RigidBodyComponent() : AbstractComponent(ComponentType::RIGID_BODY) {}

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["mass"] = mass;
            json["drag"] = drag;
            json["inertia"] = Dump(inertia);
            return json;
        }

        void parse(nlohmann::json &data) override {
            mass = data["mass"];
            drag = data["drag"];
            ParseInto(data["inertia"], inertia);
        }
    };

}

#endif
