#ifndef PROJECTION_UNIFORMBUFFER_H
#define PROJECTION_UNIFORMBUFFER_H

#include "AbstractResource.h"
#include "../dto/UBODataDTO.h"
#include <vector>
#include <unordered_map>

namespace PEngine {

    class Shader;

    class UniformBuffer : public AbstractResource {
    private:
        std::unordered_map<std::string, long> items;
        GLuint buffer = 0;
        int blockPoint = -1;
        const char *blockName = nullptr;
        static int blockPointIncrement;
    public:
        explicit UniformBuffer() : AbstractResource(ResourceType::UBO) {}

        UniformBuffer *init(const char *blockName, std::vector<UBODataDTO> &data);

        void bindWithShader(Shader *shader);

        void bind();

        void unbind();

        void updateData(const std::string &name, std::vector<float> data);

        void updateBuffer(std::vector<float> data);

    private:
        static int calculate(std::vector<UBODataDTO> &data);

    };

}

#endif