#include "AbstractComponent.h"
#include "entt/entt.hpp"
#include "glm/gtc/type_ptr.hpp"

namespace PEngine {

    nlohmann::json AbstractComponent::serialize() {
        nlohmann::json json;
        json["componentType"] = componentType.name;
        json["id"] = entity->getEntityId();
        return json;
    }


}
