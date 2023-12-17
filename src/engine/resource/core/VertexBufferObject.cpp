#include <glad/glad.h>
#include "VertexBufferObject.h"
#include "../ResourcesSystem.h"

namespace PEngine {
    VertexBufferObject::~VertexBufferObject() {
        glDeleteBuffers(1, &vbo);
    }

    void VertexBufferObject::init(
            unsigned int index,
            std::vector<float> &data,
            unsigned int type,
            int size,
            unsigned int dataType,
            bool isNormalized,
            unsigned int renderingType,
            int stride
    ) {

        ResourcesSystem::createBuffer(&vbo, type, data, renderingType);
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

    void VertexBufferObject::enable() {
        glEnableVertexAttribArray(index);
        glBindBuffer(type, vbo);
        glVertexAttribPointer(index, size, type, normalized, stride, nullptr);
    }

    void VertexBufferObject::disable() {
        glDisableVertexAttribArray(index);
        glBindBuffer(type, 0);
    }

    unsigned int VertexBufferObject::getVbo() const {
        return vbo;
    }

    int VertexBufferObject::getStride() const {
        return stride;
    }

    unsigned int VertexBufferObject::getIndex() const {
        return index;
    }

    unsigned int VertexBufferObject::getType1() const {
        return type;
    }

    int VertexBufferObject::getSize() const {
        return size;
    }

    bool VertexBufferObject::isNormalized() const {
        return normalized;
    }

    unsigned int VertexBufferObject::getLength() const {
        return length;
    }

    bool VertexBufferObject::isReady() const {
        return ready;
    }
}
