#ifndef PROJECTION_TEXTURE_H
#define PROJECTION_TEXTURE_H

#include "AbstractResource.h"

namespace PEngine{

    class Texture : public AbstractResource {
    public:
        explicit Texture() : AbstractResource(ResourceType::TEXTURE){}
    };
}

#endif
