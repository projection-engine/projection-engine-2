#include "CTransform.h"

namespace PEngine {
    const glm::mat4 &CTransform::getMatrix() const {
        return matrix;
    }

    const glm::vec3 &CTransform::getTranslation() const {
        return translation;
    }

    const glm::vec3 &CTransform::getScale() const {
        return scale;
    }

    const glm::vec4 &CTransform::getRotation() const {
        return rotation;
    }
}