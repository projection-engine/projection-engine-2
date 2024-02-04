#include "glad/glad.h"
#include "UniformBuffer.h"
#include "Shader.h"

namespace PEngine {
    int UniformBuffer::blockPointIncrement = 0;

    int UniformBuffer::calculate(std::vector<UBODataDTO> &data) {
        int chunk = 16;
        int tSize;
        int offset = 0;
        int sizeTotal;
        int sizeOffset;
        size_t quantity = data.size() / sizeof(UBODataDTO);
        for (int i = 0; i < quantity; i++) {
            if (data[i].dataLength == 0) {

                switch (data[i].type) {
                    case UBOType::FLOAT:
                    case UBOType::INT:
                    case UBOType::BOOL: {
                        sizeTotal = sizeOffset = 4;
                        break;
                    }
                    case UBOType::MAT4: {
                        sizeTotal = sizeOffset = 64;
                        break;
                    }
                    case UBOType::MAT3: {
                        sizeTotal = sizeOffset = 48;
                        break;
                    }
                    case UBOType::VEC2: {
                        sizeTotal = sizeOffset = 8;
                        break;
                    }
                    case UBOType::VEC3: {
                        sizeTotal = 16;
                        sizeOffset = 12;
                        break;
                    }
                    case UBOType::VEC4: {
                        sizeTotal = sizeOffset = 16;
                        break;
                    }
                    default: {
                        sizeTotal = sizeOffset = 0;
                    }
                }
            } else {
                sizeOffset = sizeTotal = data[i].dataLength * 16 * 4;
            }

            tSize = chunk - sizeTotal;

            if (tSize < 0 && chunk < 16) {
                offset += chunk;
                if (i > 0) data[i - 1].chunkSize += chunk;
                chunk = 16;
            } else if (tSize == 0) {
                if (data[i].type == UBOType::VEC3 && chunk == 16) chunk -= sizeOffset;
                else chunk = 16;
            } else if (tSize >= 0 || chunk != 16) chunk -= sizeOffset;


            data[i].offset = offset;
            data[i].chunkSize = sizeOffset;

            offset += sizeOffset;
        }
        return offset;
    }

    void UniformBuffer::updateBuffer(std::vector<float> &data) {
        glBufferSubData(GL_UNIFORM_BUFFER, 0, data.size() * sizeof(float), &data[0]);
    }

    void UniformBuffer::updateBuffer(float data[]) {
        glBufferSubData(GL_UNIFORM_BUFFER, 0, sizeof(data), data);
    }

    void UniformBuffer::updateData(const std::string &name, std::vector<float> &data) {
        glBufferSubData(GL_UNIFORM_BUFFER, items[name], data.size() * sizeof(float), &data[0]);
    }

    void UniformBuffer::bind() {
        glBindBuffer(GL_UNIFORM_BUFFER, buffer);
    }

    void UniformBuffer::unbind() {
        glBindBuffer(GL_UNIFORM_BUFFER, 0);
    }

    void UniformBuffer::bindWithShader(Shader *shader) {
        shader->bind();
        GLuint index = glGetUniformBlockIndex(shader->getProgram(), blockName);
        glUniformBlockBinding(shader->getProgram(), index, blockPoint);
        glBindBuffer(GL_UNIFORM_BUFFER, 0);
    }

    class UniformBuffer *UniformBuffer::init(const char *bN, std::vector<UBODataDTO> &data) {
        this->blockName = bN;

        int bufferSize = calculate(data);
        size_t quantity = data.size() / sizeof(UBODataDTO);

        for (int i = 0; i < quantity; i++) {
            items[data[i].name] = data[i].offset;
        }

        blockPoint = blockPointIncrement;
        blockPointIncrement += 1;

        glGenBuffers(1, &buffer);
        glBindBuffer(GL_UNIFORM_BUFFER, buffer);
        glBufferData(GL_UNIFORM_BUFFER, bufferSize * sizeof(float), &data[0], GL_DYNAMIC_DRAW);
        glBindBuffer(GL_UNIFORM_BUFFER, 0);
        glBindBufferBase(GL_UNIFORM_BUFFER, blockPoint, buffer);

        return this;
    }
}