#ifndef PROJECTION_MOVEMENTCOMPONENT_H
#define PROJECTION_MOVEMENTCOMPONENT_H

#include "glm/glm.hpp"
#include "AbstractComponent.h"

namespace PEngine {

    class MovementComponent : public AbstractComponent {
    private:
        glm::mat4 matrix;
        glm::vec3 translation;
        glm::vec3 scale;
        glm::vec4 rotation;
    public:
        const glm::mat4 &getMatrix() const;

        const glm::vec3 &getTranslation() const;

        const glm::vec3 &getScale() const;

        const glm::vec4 &getRotation() const;

    };

}

#endif
