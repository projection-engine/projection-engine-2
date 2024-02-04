#include "PrimitiveUtil.h"

namespace PEngine {
    std::vector<float> PrimitiveUtil::ComputeBoundingBox(std::vector<float> vertices) {
        return {};
    }

    std::vector<float>
    PrimitiveUtil::ComputeTangents(std::vector<float> indices, std::vector<float> vertices, std::vector<float> uvs,
                                   std::vector<float> normals) {
        return std::vector<float>();
    }

    std::vector<float> PrimitiveUtil::ComputeNormals(std::vector<float> indices, std::vector<float> vertices) {
        return std::vector<float>();
    }
}