#include <glad/glad.h>

#include <utility>
#include "RMesh.h"
#include "../ResourcesSystem.h"

namespace PEngine {
    RMesh *RMesh::activeMesh = nullptr;

    void RMesh::init(std::vector<float> &vertices, std::vector<float> &indices, std::vector<float> *normals,
                     std::vector<float> *uvs, std::vector<float> maxBBox,
                     std::vector<float> minBBox) {
        this->maxBoundingBox = std::move(maxBBox);
        this->minBoundingBox = std::move(minBBox);
        this->trianglesQuantity = indices.size() / 3;
        this->verticesQuantity = indices.size();

        glGenVertexArrays(1, &vao);
        glBindVertexArray(vao);

        ResourcesSystem::createBuffer(&indexBuffer, GL_ELEMENT_ARRAY_BUFFER, indices, GL_STATIC_DRAW);
        vertexVBO.init(0, vertices, GL_ARRAY_BUFFER, 3, GL_FLOAT, false, GL_STATIC_DRAW, 0);

        if (uvs != nullptr) {
            uvVBO.init(1, *uvs, GL_ARRAY_BUFFER, 2, GL_FLOAT, false, GL_STATIC_DRAW, 0);
        }

        if (normals != nullptr) {
            normalVBO.init(2, *normals, GL_ARRAY_BUFFER, 3, GL_FLOAT, false, GL_STATIC_DRAW, 0);
        }

        glBindVertexArray(0);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    }

    void RMesh::bindAllResources() {
        if (RMesh::activeMesh == this)
            return;
        RMesh::activeMesh = this;
        glBindVertexArray(vao);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
        vertexVBO.enable();
        if (normalVBO.isReady())
            normalVBO.enable();
        if (uvVBO.isReady())
            uvVBO.enable();
    }

    void RMesh::finish() {
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
        vertexVBO.disable();

        if (uvVBO.isReady())
            uvVBO.disable();
        if (normalVBO.isReady())
            normalVBO.disable();

        glBindVertexArray(0);
        RMesh::activeMesh = nullptr;
    }

    void RMesh::finishIfUsed() {
        if (RMesh::activeMesh != nullptr)
            RMesh::activeMesh->finish();
    }

    RMesh::~RMesh() {
        // TODO - DESTROY MESH RESOURCES
    }

    size_t RMesh::getVerticesQuantity() const {
        return verticesQuantity;
    }

    size_t RMesh::getTrianglesQuantity() const {
        return trianglesQuantity;
    }

    const std::vector<float> &RMesh::getMaxBoundingBox() const {
        return maxBoundingBox;
    }

    const std::vector<float> &RMesh::getMinBoundingBox() const {
        return minBoundingBox;
    }

    unsigned int RMesh::getVao() const {
        return vao;
    }

    unsigned int RMesh::getIndexBuffer() const {
        return indexBuffer;
    }

    const VertexBufferObject &RMesh::getVertexVbo() const {
        return vertexVBO;
    }

    const VertexBufferObject &RMesh::getNormalVbo() const {
        return normalVBO;
    }

    const VertexBufferObject &RMesh::getUvVbo() const {
        return uvVBO;
    }

    RMesh *RMesh::getActiveMesh() {
        return activeMesh;
    }
}
