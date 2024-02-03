#ifndef PROJECTION_STATICUBOFACTORY_H
#define PROJECTION_STATICUBOFACTORY_H


#include "../../enum/StaticResource.h"
#include <unordered_map>

namespace PEngine {
    class AbstractResource;

    void GenerateStaticUBOs(std::unordered_map<StaticResource, AbstractResource *> &rMap);
}

#endif
