#ifndef PROJECTION_SPRITECOMPONENT_H
#define PROJECTION_SPRITECOMPONENT_H

#include "../AbstractComponent.h"
#include "glm/vec2.hpp"

namespace PEngine {

    struct SpriteComponent : public AbstractComponent {
        std::string imageID;
        glm::vec2 attributes{};

        explicit SpriteComponent() : AbstractComponent(ComponentType::SPRITE) {}

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["imageID"] = imageID;
            json["attributes"] = Dump(attributes);
            return json;
        }

        void parse(nlohmann::json &data) override {
            imageID = data["imageID"];
            ParseInto(data["attributes"], attributes);
        }
    };

}

#endif
