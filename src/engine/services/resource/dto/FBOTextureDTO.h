#ifndef PROJECTION_FBOTEXTUREDTO_H
#define PROJECTION_FBOTEXTUREDTO_H

#include "glad/glad.h"

namespace PEngine {
    struct FBOTextureDTO {
        int w = -1;
        int h = -1;
        GLuint attachment = 0;
        GLint precision = GL_RGBA16F;
        GLint format = GL_RGBA;
        GLint type = GL_FLOAT;
        bool linear = false;
        bool repeat = false;

        FBOTextureDTO(int w, int h) : w(w), h(h) {}
    };
}
#endif
