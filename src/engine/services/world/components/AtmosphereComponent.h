#ifndef PROJECTION_ATMOSPHERECOMPONENT_H
#define PROJECTION_ATMOSPHERECOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"
#include "../../../enum/AtmosphereRenderingType.h"

namespace PEngine {

    struct AtmosphereComponent : public AbstractComponent {
        long long elapsedTime = 0;
        int maxSamples = 10;
        long mieHeight = 1000;
        long rayleighHeight = 8000;
        float atmosphereRadius = 1;
        long planetRadius = 1;
        int intensity = 20;
        float threshold = 0;
        AtmosphereRenderingType renderingType = AtmosphereRenderingType::COMBINED;

        glm::vec3 sunDirection = glm::vec3(1, 1, 1);
        glm::vec3 betaRayleigh = glm::vec3(1, 1, 1);
        glm::vec3 betaMie = glm::vec3(1, 1, 1);

        explicit AtmosphereComponent() : AbstractComponent(ComponentType::ATMOSPHERE) {}

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["elapsedTime"] = elapsedTime;
            json["maxSamples"] = maxSamples;
            json["mieHeight"] = mieHeight;
            json["rayleighHeight"] = rayleighHeight;
            json["atmosphereRadius"] = atmosphereRadius;
            json["planetRadius"] = planetRadius;
            json["intensity"] = intensity;
            json["threshold"] = threshold;
            json["renderingType"] = renderingType;
            json["sunDirection"] = Dump(sunDirection);
            json["betaRayleigh"] = Dump(betaRayleigh);
            json["betaMie"] = Dump(betaMie);

            return json;
        }

        void parse(nlohmann::json &data) override {
            elapsedTime = data["elapsedTime"];
            maxSamples = data["maxSamples"];
            mieHeight = data["mieHeight"];
            rayleighHeight = data["rayleighHeight"];
            atmosphereRadius = data["atmosphereRadius"];
            planetRadius = data["planetRadius"];
            intensity = data["intensity"];
            threshold = data["threshold"];
            renderingType = data["renderingType"];
            ParseInto(data["sunDirection"], sunDirection);
            ParseInto(data["betaRayleigh"], betaRayleigh);
            ParseInto(data["betaMie"], betaMie);
        }
    };

}

#endif
