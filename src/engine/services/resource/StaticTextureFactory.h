
#ifndef PROJECTION_STATICTEXTUREFACTORY_H
#define PROJECTION_STATICTEXTUREFACTORY_H

#include <unordered_map>
#include "../../enum/StaticResource.h"

namespace PEngine {

    class AbstractResource;

    void GenerateNoiseTexture(std::unordered_map<StaticResource, AbstractResource *> &rMap);

}

#endif
