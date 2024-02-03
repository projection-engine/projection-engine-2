#include <vector>
#include "GPUUtil.h"
#include "glad/glad.h"

namespace PEngine {

    void GPUUtil::createTexture(
            unsigned int *target,
            unsigned int width,
            unsigned int height,
            unsigned int internalFormat,
            unsigned int border,
            unsigned int format,
            unsigned int type,
            unsigned int minFilter,
            unsigned int magFilter,
            unsigned int wrapS,
            unsigned int wrapT,
            unsigned char *data
    ) {
        glGenTextures(1, target);
        glBindTexture(GL_TEXTURE_2D, *target);
        glTexImage2D(GL_TEXTURE_2D, 0, internalFormat, width, height, border, format, type, data);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, magFilter);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, minFilter);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT);
        glBindTexture(GL_TEXTURE_2D, 0);
    }

    void GPUUtil::createBuffer(
            unsigned int *target,
            unsigned int type,
            std::vector<float> &data,
            unsigned int renderingType
    ) {
        glGenBuffers(1, target);
        glBindBuffer(type, *target);
        glBufferData(type, data.size() * sizeof(float), &data[0], renderingType);
    }

}