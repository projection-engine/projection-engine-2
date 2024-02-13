#include "AbstractComponent.h"
#include "entt/entt.hpp"
#include "glm/gtc/type_ptr.hpp"

namespace PEngine {

    nlohmann::json AbstractComponent::serialize() {
        nlohmann::json json;
        json["componentType"] = componentType.name;
        json["entityID"] = entity->getEntityId();
        return json;
    }

    nlohmann::json AbstractComponent::Dump(glm::vec2 &vec) {
        return nlohmann::json{{"x", vec.x},
                              {"y", vec.y}};
    }

    nlohmann::json AbstractComponent::Dump(glm::vec3 &vec) {
        return nlohmann::json{{"x", vec.x},
                              {"y", vec.y},
                              {"z", vec.z}};
    }

    nlohmann::json AbstractComponent::Dump(glm::vec4 &vec) {
        return nlohmann::json{{"x", vec.x},
                              {"y", vec.y},
                              {"z", vec.z},
                              {"w", vec.z}};
    }

    nlohmann::json AbstractComponent::Dump(glm::mat4 &mat) {
        const float *data = glm::value_ptr(mat);
        return nlohmann::json{{"m11", data[0]},
                              {"m12", data[1]},
                              {"m13", data[2]},
                              {"m14", data[3]},
                              {"m21", data[4]},
                              {"m22", data[5]},
                              {"m23", data[6]},
                              {"m24", data[7]},
                              {"m31", data[8]},
                              {"m32", data[9]},
                              {"m33", data[10]},
                              {"m34", data[11]},
                              {"m41", data[12]},
                              {"m42", data[13]},
                              {"m43", data[14]},
                              {"m44", data[15]}};
    }


    nlohmann::json AbstractComponent::Dump(glm::mat3 &mat) {
        const float *data = glm::value_ptr(mat);
        return nlohmann::json{{"m11", data[0]},
                              {"m12", data[1]},
                              {"m13", data[2]},
                              {"m21", data[3]},
                              {"m22", data[4]},
                              {"m23", data[5]},
                              {"m31", data[6]},
                              {"m32", data[7]},
                              {"m33", data[8]}};
    }

    void AbstractComponent::ParseInto(nlohmann::json &json, glm::mat3 &mat) {
        json.at("m11").get_to(mat[0][0]);
        json.at("m12").get_to(mat[0][1]);
        json.at("m13").get_to(mat[0][2]);
        json.at("m21").get_to(mat[1][0]);
        json.at("m22").get_to(mat[1][1]);
        json.at("m23").get_to(mat[1][2]);
        json.at("m31").get_to(mat[2][0]);
        json.at("m32").get_to(mat[2][1]);
        json.at("m33").get_to(mat[2][2]);
    }

    void AbstractComponent::ParseInto(nlohmann::json &json, glm::mat4 &mat) {
        json.at("m11").get_to(mat[0][0]);
        json.at("m12").get_to(mat[0][1]);
        json.at("m13").get_to(mat[0][2]);
        json.at("m14").get_to(mat[0][3]);

        json.at("m21").get_to(mat[1][0]);
        json.at("m22").get_to(mat[1][1]);
        json.at("m23").get_to(mat[1][2]);
        json.at("m24").get_to(mat[1][3]);

        json.at("m31").get_to(mat[2][0]);
        json.at("m32").get_to(mat[2][1]);
        json.at("m33").get_to(mat[2][2]);
        json.at("m34").get_to(mat[2][3]);

        json.at("m41").get_to(mat[3][0]);
        json.at("m42").get_to(mat[3][1]);
        json.at("m43").get_to(mat[3][2]);
        json.at("m44").get_to(mat[3][3]);
    }

    void AbstractComponent::ParseInto(nlohmann::json &json, glm::vec2 &vec) {
        json.at("x").get_to(vec.x);
        json.at("y").get_to(vec.y);
    }

    void AbstractComponent::ParseInto(nlohmann::json &json, glm::vec3 &vec) {
        json.at("x").get_to(vec.x);
        json.at("y").get_to(vec.y);
        json.at("z").get_to(vec.z);
    }

    void AbstractComponent::ParseInto(nlohmann::json &json, glm::vec4 &vec) {
        json.at("x").get_to(vec.x);
        json.at("y").get_to(vec.y);
        json.at("z").get_to(vec.z);
        json.at("w").get_to(vec.w);
    }

}
