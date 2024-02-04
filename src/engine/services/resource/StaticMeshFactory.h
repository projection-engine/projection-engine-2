#ifndef PROJECTION_STATICMESHFACTORY_H
#define PROJECTION_STATICMESHFACTORY_H

#include <unordered_map>
#include <string>
#include "../../enum/StaticResource.h"
#include "dto/FBOTextureDTO.h"

namespace PEngine {
    class AbstractFSService;

    class AbstractResource;

    class ResourceService;

    void GenerateStaticMeshes(ResourceService *service, AbstractFSService *fs);
}

#endif
