#include "MathUtil.h"
#include "glm/fwd.hpp"

namespace PEngine {
    void MathUtil::FromRotationTranslation(glm::mat4 &out, glm::vec4 &q, glm::vec3 &v) {
        float x = q[0], y = q[1], z = q[2], w = q[3];
        float x2 = x + x;
        float y2 = y + y;
        float z2 = z + z;
        float xx = x * x2;
        float xy = x * y2;
        float xz = x * z2;
        float yy = y * y2;
        float yz = y * z2;
        float zz = z * z2;
        float wx = w * x2;
        float wy = w * y2;
        float wz = w * z2;
        out[0][0] = 1 - (yy + zz);
        out[0][1] = xy + wz;
        out[0][2] = xz - wy;
        out[0][3] = 0;
        out[1][0] = xy - wz;
        out[1][1] = 1 - (xx + zz);
        out[1][2] = yz + wx;
        out[1][3] = 0;
        out[2][0] = xz + wy;
        out[2][1] = yz - wx;
        out[2][2] = 1 - (xx + yy);
        out[2][3] = 0;
        out[3][0] = v[0];
        out[3][1] = v[1];
        out[3][2] = v[2];
        out[3][3] = 1;
    }
}