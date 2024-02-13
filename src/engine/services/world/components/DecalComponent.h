
#ifndef PROJECTION_DECALCOMPONENT_H
#define PROJECTION_DECALCOMPONENT_H

#include "../AbstractComponent.h"
#include "../../../enum/MaterialRenderingType.h"

namespace PEngine {
    class Texture;

    struct DecalComponent : public AbstractComponent {
        MaterialRenderingType renderingMode = MaterialRenderingType::ISOTROPIC;
        std::string albedoID{};
        std::string roughnessID{};
        std::string metallicID{};
        std::string normalID{};
        std::string occlusionID{};
        bool useSSR = false;
        float anisotropicRotation = 0;
        float anisotropy = 0;
        float clearCoat = 0;
        float sheen = 0;
        float sheenTint = 0;

        explicit DecalComponent() : AbstractComponent(ComponentType::DECAL) {}

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["renderingMode"] = renderingMode;
            json["albedoID"] = albedoID;
            json["roughnessID"] = roughnessID;
            json["metallicID"] = metallicID;
            json["normalID"] = normalID;
            json["occlusionID"] = occlusionID;
            json["useSSR"] = useSSR;
            json["anisotropicRotation"] = anisotropicRotation;
            json["anisotropy"] = anisotropy;
            json["clearCoat"] = clearCoat;
            json["sheen"] = sheen;
            json["sheenTint"] = sheenTint;
            return json;
        }

        void parse(nlohmann::json &data) override {
            renderingMode = data["renderingMode"];
            albedoID = data["albedoID"];
            roughnessID = data["roughnessID"];
            metallicID = data["metallicID"];
            normalID = data["normalID"];
            occlusionID = data["occlusionID"];
            useSSR = data["useSSR"];
            anisotropicRotation = data["anisotropicRotation"];
            anisotropy = data["anisotropy"];
            clearCoat = data["clearCoat"];
            sheen = data["sheen"];
            sheenTint = data["sheenTint"];
        }
    };

}

#endif
