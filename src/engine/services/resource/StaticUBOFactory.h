#ifndef PROJECTION_STATICUBOFACTORY_H
#define PROJECTION_STATICUBOFACTORY_H


#include "../../enum/StaticResource.h"
#include <unordered_map>

namespace PEngine {
    class AbstractResource;

    class ResourceService;

    void GenerateStaticUBOs(ResourceService *service);
}

#endif
