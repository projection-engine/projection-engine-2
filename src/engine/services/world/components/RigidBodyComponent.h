
#ifndef PROJECTION_RIGIDBODYCOMPONENT_H
#define PROJECTION_RIGIDBODYCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"

namespace PEngine {

    struct RigidBodyComponent : public AbstractComponent {
        glm::vec3 inertia = glm::vec3(0, 0, 0);
        float mass = 1;
        float drag = 0;
        bool initialized = false;
        explicit RigidBodyComponent() : AbstractComponent(ComponentType::RIGID_BODY) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif
