#ifndef PROJECTION_CULLINGCOMPONENT_H
#define PROJECTION_CULLINGCOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct CullingComponent : public AbstractComponent {
        bool screenDoorEffect = false;
        float screenDoorEffectDistanceMultiplier = .5;
        float distance = 100;
        bool distanceCulling = false;
        bool occlusionCulling = false;
    };

}

#endif
