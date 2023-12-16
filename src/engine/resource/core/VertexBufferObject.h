#ifndef CATALYST_VERTEXBUFFEROBJECT_H
#define CATALYST_VERTEXBUFFEROBJECT_H

#include <vector>
#include "IResource.h"

namespace PEngine {

    class VertexBufferObject {
    private:
        GLuint vbo;
        int stride;
        unsigned int index;
        unsigned int type;
        int size;
        bool normalized;
        unsigned int length = 0;
        bool ready = false;
    public:
        bool isReady() const;

        unsigned int getVbo() const;

        int getStride() const;

        unsigned int getIndex() const;

        unsigned int getType1() const;

        int getSize() const;

        bool isNormalized() const;

        unsigned int getLength() const;

    public:
        explicit VertexBufferObject() {}

        ~VertexBufferObject();

        void init(
                unsigned int index,
                std::vector<float> &data,
                unsigned int type,
                int size,
                unsigned int dataType,
                bool isNormalized,
                unsigned int renderingType,
                int stride
        );

        void enable();

        void disable();
    };
}

#endif
