#ifndef PROJECTION_CTRANSFORM_H
#define PROJECTION_CTRANSFORM_H

#include "glm/glm.hpp"
#include "IComponent.h"

namespace PEngine {

    class CTransform : public IComponent {
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
