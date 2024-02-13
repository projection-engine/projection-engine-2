
#ifndef PROJECTION_DECALCOMPONENT_H
#define PROJECTION_DECALCOMPONENT_H

#include "../AbstractComponent.h"
#include "../../../enum/MaterialRenderingType.h"

namespace PEngine {
    class Texture;

    struct DecalComponent : public AbstractComponent {
        MaterialRenderingType renderingMode = MaterialRenderingType::ISOTROPIC;
        const char *albedoID = nullptr;
        const char *roughnessID = nullptr;
        const char *metallicID = nullptr;
        const char *normalID = nullptr;
        const char *occlusionID = nullptr;
        bool useSSR = false;
        float anisotropicRotation = 0;
        float anisotropy = 0;
        float clearCoat = 0;
        float sheen = 0;
        float sheenTint = 0;

        explicit DecalComponent() : AbstractComponent(ComponentType::DECAL) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif
