#ifndef PROJECTION_STATICSHADERFACTORY_H
#define PROJECTION_STATICSHADERFACTORY_H

#include <unordered_map>
#include "../../enum/StaticResource.h"

namespace PEngine {
    class AbstractResource;

    void GenerateStaticShaders(std::unordered_map<StaticResource, AbstractResource *> &rMap);
}

#endif
