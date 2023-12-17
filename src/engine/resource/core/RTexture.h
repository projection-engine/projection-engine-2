#ifndef PROJECTION_RTEXTURE_H
#define PROJECTION_RTEXTURE_H

#include "IResource.h"

namespace PEngine{

    class RTexture : public IResource {
    public:
        explicit RTexture() : IResource(ResourceType::TEXTURE){}
    };
}

#endif
