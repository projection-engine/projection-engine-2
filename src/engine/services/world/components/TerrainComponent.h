#ifndef PROJECTION_TERRAINCOMPONENT_H
#define PROJECTION_TERRAINCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec2.hpp"

namespace PEngine {

    struct TerrainComponent : public AbstractComponent {
        std::string heightMapID;

        explicit TerrainComponent() : AbstractComponent(ComponentType::TERRAIN) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["heightMapID"] = heightMapID;
            return json;
        }

        void parse(nlohmann::json &data) override {
            heightMapID = data["heightMapID"];
        }
    };

}

#endif
