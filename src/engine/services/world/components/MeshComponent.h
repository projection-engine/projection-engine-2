
#ifndef PROJECTION_MESHCOMPONENT_H
#define PROJECTION_MESHCOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct MeshComponent : public AbstractComponent {
        const char *meshID;
        const char *materialID;
        bool castsShadows = true;
        bool contributeToProbes = true;
        bool overrideMaterialUniforms = false;
        explicit MeshComponent() : AbstractComponent(ComponentType::MESH_MATERIAL) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif //PROJECTION_MESHCOMPONENT_H
