
#ifndef PROJECTION_STATICFBOFACTORY_H
#define PROJECTION_STATICFBOFACTORY_H

#include <unordered_map>
#include "../../enum/StaticResource.h"

namespace PEngine {
    class AbstractResource;

    class ResourceService;

    void GenerateDirectionalShadowsFBO(ResourceService *service, int width, int height);

    void GenerateStaticFBOs(ResourceService *service, int width, int height);

}

#endif
