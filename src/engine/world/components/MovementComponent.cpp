#include "MovementComponent.h"

namespace PEngine {
    const glm::mat4 &MovementComponent::getMatrix() const {
        return matrix;
    }

    const glm::vec3 &MovementComponent::getTranslation() const {
        return translation;
    }

    const glm::vec3 &MovementComponent::getScale() const {
        return scale;
    }

    const glm::vec4 &MovementComponent::getRotation() const {
        return rotation;
    }
}