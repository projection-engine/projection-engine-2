#ifndef PROJECTION_SPRITECOMPONENT_H
#define PROJECTION_SPRITECOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec2.hpp"

namespace PEngine {

    struct SpriteComponent : public AbstractComponent {
        const char *imageID = nullptr;
        glm::vec2 attributes{};

        explicit SpriteComponent() : AbstractComponent(ComponentType::SPRITE) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif
