#ifndef PROJECTION_CULLINGCOMPONENT_H
#define PROJECTION_CULLINGCOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct CullingComponent : public AbstractComponent {
        bool screenDoorEffect = false;
        float screenDoorEffectDistanceMultiplier = .5;
        float distance = 100;
        bool distanceCulling = false;
        bool occlusionCulling = false;

        explicit CullingComponent() : AbstractComponent(ComponentType::CULLING) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["screenDoorEffect"] = screenDoorEffect;
            json["screenDoorEffectDistanceMultiplier"] = screenDoorEffectDistanceMultiplier;
            json["distance"] = distance;
            json["distanceCulling"] = distanceCulling;
            json["occlusionCulling"] = occlusionCulling;
            return json;
        }

        void parse(nlohmann::json &data) override {
            screenDoorEffect = data["screenDoorEffect"];
            screenDoorEffectDistanceMultiplier = data["screenDoorEffectDistanceMultiplier"];
            distance = data["distance"];
            distanceCulling = data["distanceCulling"];
            occlusionCulling = data["occlusionCulling"];
        }
    };

}

#endif
