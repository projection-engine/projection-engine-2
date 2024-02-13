#ifndef PROJECTION_RUNTIMESTATE_H
#define PROJECTION_RUNTIMESTATE_H

#include <cstdint>
#include <vector>
#include "AbstractSerializable.h"

namespace PEngine {

    struct RuntimeState : public AbstractSerializable {
        int viewportWidth = 0;
        int viewportHeight = 0;
        long long int elapsed = 0;

        std::uint32_t lockedEntity;
        std::vector<std::uint32_t> selected;

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["viewportWidth"] = viewportWidth;
            json["viewportHeight"] = viewportHeight;
            json["elapsed"] = elapsed;
            json["lockedEntity"] = lockedEntity;
            json["selected"] = selected;
            return json;
        }

        void parse(nlohmann::json &data) override {
            viewportWidth = data["viewportWidth"];
            viewportHeight = data["viewportHeight"];
            elapsed = data["elapsed"];
            lockedEntity = data["lockedEntity"];
            selected.clear();
            for (auto s: data["selected"]) {
                selected.push_back(s.get<std::uint32_t>());
            }
        }
    };

}

#endif
