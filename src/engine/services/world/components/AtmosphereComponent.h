#ifndef PROJECTION_ATMOSPHERECOMPONENT_H
#define PROJECTION_ATMOSPHERECOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec3.hpp"
#include "../../../enum/AtmosphereRenderingType.h"

namespace PEngine {

    struct AtmosphereComponent : public AbstractComponent {
        long long elapsedTime = 0;
        glm::vec3 sunDirection = glm::vec3(1, 1, 1);
        int maxSamples = 10;
        long mieHeight = 1000;
        long rayleighHeight = 8000;
        float atmosphereRadius = 1;
        long planetRadius = 1;
        int intensity = 20;
        AtmosphereRenderingType renderingType = AtmosphereRenderingType::COMBINED;
        glm::vec3 betaRayleigh = glm::vec3(1, 1, 1);
        glm::vec3 betaMie = glm::vec3(1, 1, 1);
        float threshold = 0;

        explicit AtmosphereComponent() : AbstractComponent(ComponentType::ATMOSPHERE) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif
