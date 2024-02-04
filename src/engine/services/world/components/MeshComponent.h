
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
    };

}

#endif //PROJECTION_MESHCOMPONENT_H
