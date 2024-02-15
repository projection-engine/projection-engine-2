#ifndef PROJECTION_LIGHTPROBECOMPONENT_H
#define PROJECTION_LIGHTPROBECOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct LightProbeComponent : public AbstractComponent {
        int mipmaps = 6;
        float maxDistance = 50;

        explicit LightProbeComponent() : AbstractComponent(ComponentType::LIGHT_PROBE) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["mipmaps"] = mipmaps;
            json["maxDistance"] = maxDistance;
            return json;
        }

        void parse(nlohmann::json &data) override {
            mipmaps = data["mipmaps"];
            maxDistance = data["maxDistance"];
        }
    };

}

#endif
