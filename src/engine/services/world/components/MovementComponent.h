#ifndef PROJECTION_MOVEMENTCOMPONENT_H
#define PROJECTION_MOVEMENTCOMPONENT_H

#include "glm/glm.hpp"
#include "../AbstractComponent.h"
#include "../../../enum/ComponentType.h"
#include "../../../enum/RotationType.h"

namespace PEngine {

    struct MovementComponent : public AbstractComponent {
        glm::mat4 previousModelMatrix;
        glm::mat4 matrix;
        glm::mat4 baseTransformationMatrix;
        glm::vec3 translation;
        glm::vec3 pivotPoint;
        glm::vec3 absoluteTranslation;
        glm::vec3 scale = glm::vec3(1, 1, 1);
        glm::vec3 rotationEuler;
        glm::vec4 rotationQuaternion = glm::vec4(0, 0, 0, 1);
        glm::vec4 rotationQuaternionFinal = glm::vec4(0, 0, 0, 1);
        RotationType rotationType = RotationType::ROTATION_QUATERNION;
        bool changed = false;
        bool changesApplied = true;
        bool isUnderChange = false;
        bool lockedRotation = false;
        bool lockedTranslation = false;
        bool lockedScaling = false;
    };

}

#endif
