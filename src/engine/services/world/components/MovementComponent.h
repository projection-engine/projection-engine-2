#ifndef PROJECTION_MOVEMENTCOMPONENT_H
#define PROJECTION_MOVEMENTCOMPONENT_H

#include "glm/glm.hpp"
#include "../AbstractComponent.h"
#include "../../../enum/ComponentType.h"

namespace PEngine {

    struct MovementComponent : public AbstractComponent {
        glm::mat4 matrix;
        glm::vec3 translation;
        glm::vec3 scale;
        glm::vec4 rotation;
    };

}

#endif
