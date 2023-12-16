#ifndef CATALYST_RMESH_H
#define CATALYST_RMESH_H

#include <vector>
#include "IResource.h"
#include "VertexBufferObject.h"

namespace PEngine {

    class RMesh : public IResource {
    private:
        size_t verticesQuantity;
        size_t trianglesQuantity;
        std::vector<float> maxBoundingBox;
        std::vector<float> minBoundingBox;
        GLuint vao;
        GLuint indexBuffer;
        VertexBufferObject vertexVBO;
        VertexBufferObject normalVBO;
        VertexBufferObject uvVBO;
        static RMesh *activeMesh;
    public:

        explicit RMesh() : IResource(ResourceType::MESH) {}

        ~RMesh() override;

        void init(std::vector<float> &vertices, std::vector<float> &indices, std::vector<float> *normals,
                  std::vector<float> *uvs, std::vector<float> maxBBox,
                  std::vector<float> minBBox);

        void bindAllResources();

        void finish();

        static void finishIfUsed();

        size_t getVerticesQuantity() const;

        size_t getTrianglesQuantity() const;

        const std::vector<float> &getMaxBoundingBox() const;

        const std::vector<float> &getMinBoundingBox() const;

        unsigned int getVao() const;

        unsigned int getIndexBuffer() const;

        const VertexBufferObject &getVertexVbo() const;

        const VertexBufferObject &getNormalVbo() const;

        const VertexBufferObject &getUvVbo() const;

        static RMesh *getActiveMesh();
    };

}


#endif
