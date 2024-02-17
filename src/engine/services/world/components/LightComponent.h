
#ifndef PROJECTION_LIGHTCOMPONENT_H
#define PROJECTION_LIGHTCOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/detail/type_vec2.hpp"
#include "glm/detail/type_mat4x4.hpp"
#include "../../../enum/LightType.h"

namespace PEngine {

    struct LightComponent : public AbstractComponent {
        glm::vec3 color = glm::vec3(255, 255, 255);
        glm::vec3 fixedColor = glm::vec3(1, 1, 1);
        glm::vec2 attenuation;
        glm::vec2 atlasFace;
        glm::mat4 lightProjection;
        glm::mat4 lightView;
        bool hasSSS = false;
        bool shadowMap = true;
        std::string type = LightType::DIRECTIONAL;
        float shadowBias = .0001;
        float shadowSamples = 3;
        float zNear = 1;
        float zFar = 10000;
        float cutoff = 50;
        float shadowAttenuationMinDistance = 50;
        float smoothing = .5;
        float radius = 45;
        float size = 35;
        float areaRadius = 1;
        float planeAreaWidth = 1;
        float planeAreaHeight = 1;
        float intensity = 1;

        explicit LightComponent() : AbstractComponent(ComponentType::LIGHT) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["hasSSS"] = hasSSS;
            json["shadowMap"] = shadowMap;
            json["type"] = type;
            json["shadowBias"] = shadowBias;
            json["shadowSamples"] = shadowSamples;
            json["zNear"] = zNear;
            json["zFar"] = zFar;
            json["cutoff"] = cutoff;
            json["shadowAttenuationMinDistance"] = shadowAttenuationMinDistance;
            json["smoothing"] = smoothing;
            json["radius"] = radius;
            json["size"] = size;
            json["areaRadius"] = areaRadius;
            json["planeAreaWidth"] = planeAreaWidth;
            json["planeAreaHeight"] = planeAreaHeight;
            json["intensity"] = intensity;
            json["color"] = Dump(color);
            json["fixedColor"] = Dump(fixedColor);
            json["attenuation"] = Dump(attenuation);
            json["atlasFace"] = Dump(atlasFace);
            json["lightProjection"] = Dump(lightProjection);
            json["lightView"] = Dump(lightView);

            return json;
        }

        void parse(nlohmann::json &data) override {
            hasSSS = data["hasSSS"];
            shadowMap = data["shadowMap"];
            type = data["type"];
            shadowBias = data["shadowBias"];
            shadowSamples = data["shadowSamples"];
            zNear = data["zNear"];
            zFar = data["zFar"];
            cutoff = data["cutoff"];
            shadowAttenuationMinDistance = data["shadowAttenuationMinDistance"];
            smoothing = data["smoothing"];
            radius = data["radius"];
            size = data["size"];
            areaRadius = data["areaRadius"];
            planeAreaWidth = data["planeAreaWidth"];
            planeAreaHeight = data["planeAreaHeight"];
            intensity = data["intensity"];

            ParseInto(data["color"], color);
            ParseInto(data["fixedColor"], fixedColor);
            ParseInto(data["attenuation"], attenuation);
            ParseInto(data["atlasFace"], atlasFace);
            ParseInto(data["lightProjection"], lightProjection);
            ParseInto(data["lightView"], lightView);
        }
    };
}

#endif
