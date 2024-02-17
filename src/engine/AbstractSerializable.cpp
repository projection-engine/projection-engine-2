#include <stdexcept>
#include "AbstractSerializable.h"
#include "glm/gtc/type_ptr.hpp"


namespace PEngine {
    AbstractSerializable AbstractSerializable::getNew() {
        throw std::invalid_argument("Method not implemented");
    }

    nlohmann::json AbstractSerializable::serialize() {
        throw std::invalid_argument("Method not implemented");

    }

    void AbstractSerializable::parse(nlohmann::json &data) {
        throw std::invalid_argument("Method not implemented");
    }


    nlohmann::json AbstractSerializable::Dump(glm::vec2 &vec) {
        return nlohmann::json{vec.x,
                              vec.y};
    }

    nlohmann::json AbstractSerializable::Dump(glm::vec3 &vec) {
        return nlohmann::json{vec.x,
                              vec.y,
                              vec.z};
    }

    nlohmann::json AbstractSerializable::Dump(glm::vec4 &vec) {
        return nlohmann::json{vec.x,
                              vec.y,
                              vec.z,
                              vec.z};
    }

    nlohmann::json AbstractSerializable::Dump(glm::mat4 &mat) {
        const float *data = glm::value_ptr(mat);
        return nlohmann::json{mat[0][0],
                              mat[0][1],
                              mat[0][2],
                              mat[0][3],
                              mat[1][0],
                              mat[1][1],
                              mat[1][2],
                              mat[1][3],
                              mat[2][0],
                              mat[2][1],
                              mat[2][2],
                              mat[2][3],
                              mat[3][0],
                              mat[3][1],
                              mat[3][2],
                              mat[3][3]};
    }


    nlohmann::json AbstractSerializable::Dump(glm::mat3 &mat) {
        const float *data = glm::value_ptr(mat);
        return nlohmann::json{mat[0][0],
                              mat[0][1],
                              mat[0][2],
                              mat[1][0],
                              mat[1][1],
                              mat[1][2],
                              mat[2][0],
                              mat[2][1],
                              mat[2][2]};
    }

    void AbstractSerializable::ParseInto(nlohmann::json &json, glm::mat3 &mat) {
        mat[0][0] = json[0];
        mat[0][1] = json[1];
        mat[0][2] = json[2];
        mat[1][0] = json[3];
        mat[1][1] = json[4];
        mat[1][2] = json[5];
        mat[2][0] = json[6];
        mat[2][1] = json[7];
        mat[2][2] = json[8];
    }

    void AbstractSerializable::ParseInto(nlohmann::json &json, glm::mat4 &mat) {
        mat[0][0] = json[0];
        mat[0][1] = json[1];
        mat[0][2] = json[2];
        mat[0][3] = json[3];
        mat[1][0] = json[4];
        mat[1][1] = json[5];
        mat[1][2] = json[6];
        mat[1][3] = json[7];
        mat[2][0] = json[8];
        mat[2][1] = json[9];
        mat[2][2] = json[10];
        mat[2][3] = json[11];
        mat[3][0] = json[12];
        mat[3][1] = json[13];
        mat[3][2] = json[14];
        mat[3][3] = json[15];
    }

    void AbstractSerializable::ParseInto(nlohmann::json &json, glm::vec2 &vec) {
        vec.x = json[0];
        vec.y = json[1];
    }

    void AbstractSerializable::ParseInto(nlohmann::json &json, glm::vec3 &vec) {
        vec.x = json[0];
        vec.y = json[1];
        vec.z = json[2];
    }

    void AbstractSerializable::ParseInto(nlohmann::json &json, glm::vec4 &vec) {
        vec.x = json[0];
        vec.y = json[1];
        vec.z = json[2];
        vec.w = json[3];
    }
}
