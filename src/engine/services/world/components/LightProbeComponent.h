#ifndef PROJECTION_LIGHTPROBECOMPONENT_H
#define PROJECTION_LIGHTPROBECOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct LightProbeComponent  : public AbstractComponent {
        int mipmaps = 6;
        float maxDistance = 50;
    };

}

#endif
