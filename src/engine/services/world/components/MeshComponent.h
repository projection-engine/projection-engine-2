
#ifndef PROJECTION_MESHCOMPONENT_H
#define PROJECTION_MESHCOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct MeshComponent : public AbstractComponent {
        std::string meshID;
        std::string materialID;
        bool castsShadows = true;
        bool contributeToProbes = true;
        bool overrideMaterialUniforms = false;

        explicit MeshComponent() : AbstractComponent(ComponentType::MESH_MATERIAL) {}

        nlohmann::json serialize() override {
            nlohmann::json json = AbstractComponent::serialize();
            json["castsShadows"] = castsShadows;
            json["contributeToProbes"] = contributeToProbes;
            json["overrideMaterialUniforms"] = overrideMaterialUniforms;
            json["materialID"] = materialID;
            json["meshID"] = meshID;
            return json;
        }

        void parse(nlohmann::json &data) override {
            materialID = data["materialID"];
            meshID = data["meshID"];
            castsShadows = data["castsShadows"];
            contributeToProbes = data["contributeToProbes"];
            overrideMaterialUniforms = data["overrideMaterialUniforms"];
        }
    };

}

#endif
