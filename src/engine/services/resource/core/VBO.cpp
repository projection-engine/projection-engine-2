#include "glad/glad.h"
#include "VBO.h"
#include "../../ResourceService.h"
#include "../../../util/GPUUtil.h"

namespace PEngine {
    VBO::~VBO() {
        glDeleteBuffers(1, &vbo);
    }

    void VBO::init(
            unsigned int index,
            std::vector<float> &data,
            unsigned int type,
            int size,
            unsigned int dataType,
            bool isNormalized,
            unsigned int renderingType,
            int stride
    ) {

        GPUUtil::createBuffer(&vbo, type, data, renderingType);
        glVertexAttribPointer(
                index,
                size,
                dataType,
                isNormalized,
                stride,
                nullptr);
        glBindBuffer(type, 0);

        this->stride = stride;
        this->index = index;
        this->type = type;
        this->size = size;
        this->normalized = isNormalized;
        this->length = data.size();
        ready = true;
    }

    void VBO::enable() {
        glEnableVertexAttribArray(index);
        glBindBuffer(type, vbo);
        glVertexAttribPointer(index, size, type, normalized, stride, nullptr);
    }

    void VBO::disable() {
        glDisableVertexAttribArray(index);
        glBindBuffer(type, 0);
    }

    unsigned int VBO::getVbo() const {
        return vbo;
    }

    int VBO::getStride() const {
        return stride;
    }

    unsigned int VBO::getIndex() const {
        return index;
    }

    unsigned int VBO::getType1() const {
        return type;
    }

    int VBO::getSize() const {
        return size;
    }

    bool VBO::isNormalized() const {
        return normalized;
    }

    unsigned int VBO::getLength() const {
        return length;
    }

    bool VBO::isReady() const {
        return ready;
    }
}
