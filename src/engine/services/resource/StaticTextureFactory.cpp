#include "glad/glad.h"
#include "StaticTextureFactory.h"
#include "../../util/NoiseTextureDTO.h"
#include "../../util/GPUUtil.h"
#include "../../definitions.h"
#include "core/Texture.h"

namespace PEngine {
    void GenerateNoiseTexture(std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        const int RESOLUTION = 4;

        const NoiseTextureDTO &dto = GPUUtil::GenerateNoise(SSAO_KERNELS, RESOLUTION);

//        UBORepository.ssaoUBO.bind()
//        UBORepository.ssaoUBO.updateData("samples", kernels)
//        UBORepository.ssaoUBO.unbind()

        auto *pTexture = new Texture();
        rMap[StaticResource::TEXTURE_NOISE] = pTexture;
        glBindTexture(GL_TEXTURE_2D, pTexture->texture);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
        glTexStorage2D(GL_TEXTURE_2D, 1, GL_RG16F, RESOLUTION, RESOLUTION);
        glTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, RESOLUTION, RESOLUTION, GL_RG, GL_FLOAT, &dto.noiseTextureData[0]);
    }
}