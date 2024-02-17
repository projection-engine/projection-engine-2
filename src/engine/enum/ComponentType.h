#ifndef PROJECTION_COMPONENTTYPE_H
#define PROJECTION_COMPONENTTYPE_H

#include <string>
#include <utility>

namespace PEngine {
    struct ComponentType {
        static ComponentType MOVEMENT;
        static ComponentType ATMOSPHERE;
        static ComponentType CAMERA;
        static ComponentType CULLING;
        static ComponentType COLLIDER;
        static ComponentType DECAL;
        static ComponentType LIGHT;
        static ComponentType LIGHT_PROBE;
        static ComponentType MESH_MATERIAL;
        static ComponentType TERRAIN;
        static ComponentType SPRITE;
        static ComponentType RIGID_BODY;

        std::string name;

        explicit ComponentType(std::string n) : name(std::move(n)) {}

        static ComponentType Of(std::string basicString) {
            return ComponentType(std::move(basicString));
        }
    };
}
#endif
