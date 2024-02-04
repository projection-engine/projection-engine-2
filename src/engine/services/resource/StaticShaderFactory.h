#ifndef PROJECTION_STATICSHADERFACTORY_H
#define PROJECTION_STATICSHADERFACTORY_H

#include <unordered_map>
#include "../../enum/StaticResource.h"

namespace PEngine {
    class AbstractResource;

    class ResourceService;

    void GenerateStaticShaders(ResourceService *service);
}

#endif
