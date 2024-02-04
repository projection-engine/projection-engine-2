#ifndef PROJECTION_COLLIDERCOMPONENT_H
#define PROJECTION_COLLIDERCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"
#include "../../../enum/ColliderType.h"

namespace PEngine {

    struct ColliderComponent  : public AbstractComponent {
        ColliderType collisionType = ColliderType::BOX;
        glm::vec3 center = glm::vec3(0, 0, 0);
        glm::vec3 size = glm::vec3(1, 1,1);
        float height = 1;
        float radius = 1;
        bool initialized =false;
    };

}

#endif
