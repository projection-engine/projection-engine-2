
#ifndef PROJECTION_LIGHTCOMPONENT_H
#define PROJECTION_LIGHTCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/detail/type_vec2.hpp"
#include "glm/detail/type_mat4x4.hpp"
#include "../../../enum/LightType.h"

namespace PEngine {

    struct LightComponent : public AbstractComponent {
        bool hasSSS = false;
        bool shadowMap = true;
        glm::vec3 color = glm::vec3(255, 255, 255);
        glm::vec3 fixedColor = glm::vec3(1, 1, 1);
        LightType type = LightType::DIRECTIONAL;
        float shadowBias = .0001;
        float shadowSamples = 3;
        float zNear = 1;
        float zFar = 10000;
        float cutoff = 50;
        float shadowAttenuationMinDistance = 50;
        glm::vec2 attenuation;
        float smoothing = .5;
        float radius = 45;
        float size = 35;
        glm::vec2 atlasFace;
        glm::mat4 lightView;
        glm::mat4 lightProjection;
        float areaRadius = 1;
        float planeAreaWidth = 1;
        float planeAreaHeight = 1;
        float intensity = 1;
    }

}

#endif
