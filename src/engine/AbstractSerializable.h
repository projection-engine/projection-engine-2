#ifndef PROJECTION_ABSTRACTSERIALIZABLE_H
#define PROJECTION_ABSTRACTSERIALIZABLE_H

#include "nlohmann/json.hpp"
#include "../util/debug/ILoggable.h"
#include "glm/vec3.hpp"
#include "glm/vec4.hpp"
#include "glm/detail/type_mat4x4.hpp"
#include "glm/detail/type_mat3x3.hpp"

namespace PEngine {

    class AbstractSerializable : public ILoggable {
    public:
        virtual AbstractSerializable getNew();

        virtual nlohmann::json serialize();

        virtual void parse(nlohmann::json &data);

        static nlohmann::json Dump(glm::vec2 &vec);

        static nlohmann::json Dump(glm::vec3 &vec);

        static nlohmann::json Dump(glm::vec4 &vec);

        static nlohmann::json Dump(glm::mat4 &mat);

        static nlohmann::json Dump(glm::mat3 &mat);

        static void ParseInto(nlohmann::json &json, glm::mat3 &mat);

        static void ParseInto(nlohmann::json &json, glm::mat4 &mat);

        static void ParseInto(nlohmann::json &json, glm::vec2 &vec);

        static void ParseInto(nlohmann::json &json, glm::vec3 &vec);

        static void ParseInto(nlohmann::json &json, glm::vec4 &vec);
    };

}

#endif
