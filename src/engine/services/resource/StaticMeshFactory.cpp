#include "StaticMeshFactory.h"
#include "core/Shader.h"
#include "../AbstractFSService.h"
#include "nlohmann/json.hpp"
#include "core/Mesh.h"

namespace PEngine {
    std::vector<float> FillVector(nlohmann::json &object) {
        std::vector<float> vec;
        for (auto &elem: object) {
            vec.push_back(elem.get<float>());
        }
        return vec;
    }

    void GenerateStaticMeshes(AbstractFSService *fs, std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        std::string jsonData = fs->readFile("STATIC_MESHES.json");
        nlohmann::json json = nlohmann::json::parse(jsonData);

        nlohmann::json QUAD = json["QUAD"];
        nlohmann::json SPHERE = json["SPHERE"];
        nlohmann::json CUBE = json["CUBE"];
        nlohmann::json CYLINDER = json["CYLINDER"];
        nlohmann::json PLANE = json["PLANE"];
//        nlohmann::json CUBE_LINEAR;
        rMap[StaticResource::MESH_SPHERE] = (new Mesh())->init(
                FillVector(SPHERE["vertices"]),
                FillVector(SPHERE["indices"]),
                FillVector(SPHERE["normals"]),
                FillVector(SPHERE["uvs"]),
                nullptr,
                nullptr
        );
        rMap[StaticResource::MESH_CUBE] = (new Mesh())->init(
                FillVector(CUBE["vertices"]),
                FillVector(CUBE["indices"]),
                FillVector(CUBE["normals"]),
                FillVector(CUBE["uvs"]),
                nullptr,
                nullptr
        );
        rMap[StaticResource::MESH_CYLINDER] = (new Mesh())->init(
                FillVector(CYLINDER["vertices"]),
                FillVector(CYLINDER["indices"]),
                FillVector(CYLINDER["normals"]),
                FillVector(CYLINDER["uvs"]),
                nullptr,
                nullptr
        );
        rMap[StaticResource::MESH_PLANE] = (new Mesh())->init(
                FillVector(PLANE["vertices"]),
                FillVector(PLANE["indices"]),
                FillVector(PLANE["normals"]),
                FillVector(PLANE["uvs"]),
                nullptr,
                nullptr
        );
        rMap[StaticResource::MESH_QUAD] = (new Mesh())->init(
                FillVector(QUAD["vertices"]),
                FillVector(QUAD["indices"]),
                nullptr,
                nullptr
        );
//        rMap[StaticResource::MESH_cubeBuffer] = new VertexBuffer(0, new Float32Array(CUBE_LINEAR), GPU.context.ARRAY_BUFFER, 3, GPU.context.FLOAT, false, undefined, 0)
    }
}