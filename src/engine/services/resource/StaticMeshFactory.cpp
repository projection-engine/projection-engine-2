#include "StaticMeshFactory.h"
#include "core/Shader.h"
#include "../AbstractFSService.h"
#include "nlohmann/json.hpp"
#include "core/Mesh.h"
#include "../../util/PrimitiveUtil.h"
#include "../ResourceService.h"

namespace PEngine {
    std::vector<float> FillVector(nlohmann::json &object) {
        std::vector<float> vec;
        for (auto &elem: object) {
            vec.push_back(elem.get<float>());
        }
        return vec;
    }

    void CreateMesh(nlohmann::json &object, Mesh *instance) {
        std::vector<float> vertices = FillVector(object["vertices"]);
        std::vector<float> indices = FillVector(object["indices"]);
        std::vector<float> normals = FillVector(object["normals"]);
        std::vector<float> uvs = FillVector(object["uvs"]);
        std::vector<float> minMax = PrimitiveUtil::ComputeBoundingBox(vertices);
        instance->init(
                vertices,
                indices,
                &normals,
                &uvs,
                nullptr,
                nullptr
        );
    }

    void GenerateStaticMeshes(ResourceService *service, AbstractFSService *fs) {
        std::string jsonData = fs->readFile("STATIC_MESHES.json");
        nlohmann::json json = nlohmann::json::parse(jsonData);


        CreateMesh(json["SPHERE"], service->createResource<Mesh>(StaticResource::MESH_SPHERE));
        CreateMesh(json["CUBE"], service->createResource<Mesh>(StaticResource::MESH_CUBE));
        CreateMesh(json["CYLINDER"], service->createResource<Mesh>(StaticResource::MESH_CYLINDER));
        CreateMesh(json["PLANE"], service->createResource<Mesh>(StaticResource::MESH_PLANE));

        nlohmann::json QUAD = json["QUAD"];
        std::vector<float> vertices = FillVector(QUAD["vertices"]);
        std::vector<float> indices = FillVector(QUAD["indices"]);
        service->createResource<Mesh>(StaticResource::MESH_QUAD)
                ->init(
                        vertices,
                        indices,
                        nullptr,
                        nullptr,
                        nullptr,
                        nullptr
                );

        //        nlohmann::json CUBE_LINEAR;
//        rMap[StaticResource::MESH_cubeBuffer] = new VertexBuffer(0, new Float32Array(CUBE_LINEAR), GPU.context.ARRAY_BUFFER, 3, GPU.context.FLOAT, false, undefined, 0)
    }
}