#include "glad/glad.h"

#include <utility>
#include "Mesh.h"
#include "../../ResourceService.h"
#include "../../../util/GPUUtil.h"

namespace PEngine {
    Mesh *Mesh::activeMesh = nullptr;

    Mesh *Mesh::init(std::vector<float> &vertices,
                     std::vector<float> &indices,
                     std::vector<float> *normals,
                     std::vector<float> *uvs,
                     std::vector<float> *maxBBox,
                     std::vector<float> *minBBox) {
        this->maxBoundingBox = maxBBox;
        this->minBoundingBox = minBBox;
        this->trianglesQuantity = indices.size() / 3;
        this->verticesQuantity = indices.size();

        glGenVertexArrays(1, &vao);
        glBindVertexArray(vao);

        GPUUtil::createBuffer(&indexBuffer, GL_ELEMENT_ARRAY_BUFFER, indices, GL_STATIC_DRAW);
        vertexVBO.init(0, vertices, GL_ARRAY_BUFFER, 3, GL_FLOAT, false, GL_STATIC_DRAW, 0);

        if (uvs != nullptr) {
            uvVBO.init(1, *uvs, GL_ARRAY_BUFFER, 2, GL_FLOAT, false, GL_STATIC_DRAW, 0);
        }

        if (normals != nullptr) {
            normalVBO.init(2, *normals, GL_ARRAY_BUFFER, 3, GL_FLOAT, false, GL_STATIC_DRAW, 0);
        }

        glBindVertexArray(0);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
        return this;
    }

    void Mesh::bindAllResources() {
        if (Mesh::activeMesh == this)
            return;
        Mesh::activeMesh = this;
        glBindVertexArray(vao);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
        vertexVBO.enable();
        if (normalVBO.isReady())
            normalVBO.enable();
        if (uvVBO.isReady())
            uvVBO.enable();
    }

    void Mesh::finish() {
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
        vertexVBO.disable();

        if (uvVBO.isReady())
            uvVBO.disable();
        if (normalVBO.isReady())
            normalVBO.disable();

        glBindVertexArray(0);
        Mesh::activeMesh = nullptr;
    }

    void Mesh::finishIfUsed() {
        if (Mesh::activeMesh != nullptr)
            Mesh::activeMesh->finish();
    }

    Mesh::~Mesh() {
        // TODO - DESTROY MESH RESOURCES
    }

    size_t Mesh::getVerticesQuantity() const {
        return verticesQuantity;
    }

    size_t Mesh::getTrianglesQuantity() const {
        return trianglesQuantity;
    }

    std::vector<float> *Mesh::getMaxBoundingBox() {
        return maxBoundingBox;
    }

    std::vector<float> *Mesh::getMinBoundingBox() {
        return minBoundingBox;
    }

    GLuint Mesh::getVao() const {
        return vao;
    }

    GLuint Mesh::getIndexBuffer() const {
        return indexBuffer;
    }

    const VBO &Mesh::getVertexVbo() const {
        return vertexVBO;
    }

    const VBO &Mesh::getNormalVbo() const {
        return normalVBO;
    }

    const VBO &Mesh::getUvVbo() const {
        return uvVBO;
    }

    Mesh *Mesh::getActiveMesh() {
        return activeMesh;
    }
}
