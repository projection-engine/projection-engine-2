#include <vector>
#include <cmath>
#include <random>
#include "GPUUtil.h"
#include "glad/glad.h"

namespace PEngine {
    struct Vector3 {
        float x, y, z;
    };

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

    NoiseTextureDTO GPUUtil::GenerateNoise(int kernel, int size) {
        std::vector<float> kernels(kernel * 4 * 4);
        int offset = 0;
        std::random_device rd;
        std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
        std::uniform_real_distribution<float> dis(-1.0, 1.0);
        std::uniform_real_distribution<float> dis01(0.0, 1.0);

        for (int i = 0; i < kernel; i++) {
            float scale = static_cast<float>(i) / kernel;
            float m = .1f + .9f * (std::pow(scale, 2));

            Vector3 v{};
            v.x = 2.0f * dis(gen) - 1.0f;
            v.y = 2.0f * dis(gen) - 1.0f;
            v.z = dis01(gen);

            float x = v.x;
            float y = v.y;
            float z = v.z;
            float len = x * x + y * y + z * z;
            if (len > 0)
                len = 1 / std::sqrt(len);

            kernels[offset] = v.x * len * m;
            kernels[offset + 1] = v.y * len * m;
            kernels[offset + 2] = v.z * len * m;
            kernels[offset + 3] = 0;
            offset += 4;
        }

        int p = size * size;
        std::vector<float> noiseTextureData(p * 3);
        std::uniform_real_distribution<float> dis02(-1.0, 1.0);

        for (int i = 0; i < p; ++i) {
            int index = i * 2;
            noiseTextureData[index] = dis02(gen);
            noiseTextureData[index + 1] = dis02(gen);
            noiseTextureData[index + 2] = 0;
        }

        return NoiseTextureDTO{kernels, noiseTextureData};
    }

}