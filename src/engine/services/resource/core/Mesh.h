#ifndef PROJECTION_MESH_H
#define PROJECTION_MESH_H

#include <vector>
#include "AbstractResource.h"
#include "VBO.h"

namespace PEngine {

    class Mesh : public AbstractResource {
    private:
        size_t verticesQuantity;
        size_t trianglesQuantity;
        std::vector<float> *maxBoundingBox = nullptr;
        std::vector<float> *minBoundingBox = nullptr;
        GLuint vao;
        GLuint indexBuffer;
        VBO vertexVBO;
        VBO normalVBO;
        VBO uvVBO;
        static Mesh *activeMesh;
    public:

        explicit Mesh() : AbstractResource(ResourceType::MESH) {}

        ~Mesh() override;

        Mesh *init(std::vector<float> &vertices,
                   std::vector<float> &indices,
                   std::vector<float> *normals,
                   std::vector<float> *uvs,
                   std::vector<float> *maxBBox,
                   std::vector<float> *minBBox);

        void bindAllResources();

        void finish();

        static void finishIfUsed();

        size_t getVerticesQuantity() const;

        size_t getTrianglesQuantity() const;

        const std::vector<float> &getMaxBoundingBox() const;

        const std::vector<float> &getMinBoundingBox() const;

        unsigned int getVao() const;

        unsigned int getIndexBuffer() const;

        const VBO &getVertexVbo() const;

        const VBO &getNormalVbo() const;

        const VBO &getUvVbo() const;

        static Mesh *getActiveMesh();
    };

}


#endif
