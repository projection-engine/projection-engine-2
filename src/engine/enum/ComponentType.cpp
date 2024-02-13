#include "ComponentType.h"

namespace PEngine {
    ComponentType ComponentType::MOVEMENT = ComponentType("MOVEMENT");
    ComponentType ComponentType::ATMOSPHERE = ComponentType("ATMOSPHERE");
    ComponentType ComponentType::CAMERA = ComponentType("CAMERA");
    ComponentType ComponentType::CULLING = ComponentType("CULLING");
    ComponentType ComponentType::COLLIDER = ComponentType("COLLIDER");
    ComponentType ComponentType::DECAL = ComponentType("DECAL");
    ComponentType ComponentType::LIGHT = ComponentType("LIGHT");
    ComponentType ComponentType::LIGHT_PROBE = ComponentType("LIGHT_PROBE");
    ComponentType ComponentType::MESH_MATERIAL = ComponentType("MESH_MATERIAL");
    ComponentType ComponentType::TERRAIN = ComponentType("TERRAIN");
    ComponentType ComponentType::SPRITE = ComponentType("SPRITE");
    ComponentType ComponentType::RIGID_BODY = ComponentType("RIGID_BODY");
}
