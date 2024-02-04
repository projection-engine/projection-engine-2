#ifndef PROJECTION_MATHUTIL_H
#define PROJECTION_MATHUTIL_H

#include "glm/detail/type_mat4x4.hpp"

namespace PEngine {

    class MathUtil {
    public:
        static void FromRotationTranslation(glm::mat4 &out, glm::vec4 &q, glm::vec3 &v);
    };

}

#endif
