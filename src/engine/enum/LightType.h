#ifndef PROJECTION_LIGHTTYPE_H
#define PROJECTION_LIGHTTYPE_H

#include <string>

namespace PEngine {
    struct LightType {
        static std::string DIRECTIONAL;
        static std::string SPOT;
        static std::string POINT;
        static std::string SPHERE;
        static std::string DISK;
        static std::string PLANE;
    };
}
#endif
