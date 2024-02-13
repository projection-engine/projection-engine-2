#include "AbstractComponent.h"
#include "entt/entt.hpp"

namespace PEngine {

    nlohmann::json AbstractComponent::serialize() {
        nlohmann::json json;
        json["componentType"] = componentType.name;
        json["entityID"] = entity->getEntityId();
        return json;
    }
}
