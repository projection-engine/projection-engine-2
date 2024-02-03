
#ifndef PROJECTION_STATICFBOFACTORY_H
#define PROJECTION_STATICFBOFACTORY_H

#include <unordered_map>
#include "../../enum/StaticResource.h"

namespace PEngine {
    class AbstractResource;

    void GenerateDirectionalShadowsFBO(
            int width,
            int height,
            std::unordered_map<StaticResource, AbstractResource *> &rMap);

    void GenerateStaticFBOs(int width, int height, std::unordered_map<StaticResource, AbstractResource *> &rMap);

}

#endif
