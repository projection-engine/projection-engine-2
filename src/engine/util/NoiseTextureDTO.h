#ifndef PROJECTION_NOISETEXTUREDTO_H
#define PROJECTION_NOISETEXTUREDTO_H

namespace PEngine {

    struct NoiseTextureDTO {
        std::vector<float> kernels;
        std::vector<float> noiseTextureData;

        NoiseTextureDTO(const std::vector<float> &kernels, const std::vector<float> &noiseTextureData) : kernels(
                kernels), noiseTextureData(noiseTextureData) {}
    };

}

#endif
