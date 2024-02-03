#ifndef PROJECTION_TEXTURE_H
#define PROJECTION_TEXTURE_H

#include "glad/glad.h"
#include "AbstractResource.h"

namespace PEngine {

    class Texture : public AbstractResource {
    public:
        GLuint texture{};

        explicit Texture() : AbstractResource(ResourceType::TEXTURE) {
            glGenTextures(1, &texture);
        }
    };
}

#endif
