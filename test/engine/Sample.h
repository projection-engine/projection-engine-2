#ifndef PROJECTION_SAMPLE_H
#define PROJECTION_SAMPLE_H

#include "glm/ext/matrix_float4x4.hpp"
#include "glm/vec3.hpp"
#include "../../src/engine/AbstractSerializable.h"

namespace PEngine {
    struct Sample : public AbstractSerializable {
        glm::vec3 vector{};
        glm::mat4 matrix{};

        nlohmann::json serialize() override {
            nlohmann::json json;

            json["vector"] = Dump(vector);
            json["matrix"] = Dump(matrix);

            return json;
        }

        void parse(nlohmann::json &data) override {
            ParseInto(data["vector"], vector);
            ParseInto(data["matrix"], matrix);
        }
    };
}
#endif
