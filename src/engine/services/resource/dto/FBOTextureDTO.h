#ifndef PROJECTION_FBOTEXTUREDTO_H
#define PROJECTION_FBOTEXTUREDTO_H

#include "glad/glad.h"

namespace PEngine {
    struct FBOTextureDTO {
        int w = -1;
        int h = -1;
        int attachment = 0;
        int precision = GL_RGBA16F;
        int format = GL_RGBA;
        int type = GL_FLOAT;
        bool linear = false;
        bool repeat = false;

        FBOTextureDTO(int w, int h) : w(w), h(h) {}
    };
}
#endif
