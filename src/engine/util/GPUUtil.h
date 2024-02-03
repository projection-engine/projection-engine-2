#ifndef PROJECTION_GPUUTIL_H
#define PROJECTION_GPUUTIL_H

namespace PEngine {

    class GPUUtil {
    public:
        static void createBuffer(unsigned int *target,
                          unsigned int type,
                          std::vector<float> &data,
                          unsigned int renderingType);

        static void createTexture(unsigned int *target,
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
                           unsigned char *data);
    };

}

#endif
