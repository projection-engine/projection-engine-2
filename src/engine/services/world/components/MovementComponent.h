#ifndef PROJECTION_MOVEMENTCOMPONENT_H
#define PROJECTION_MOVEMENTCOMPONENT_H

#include "glm/glm.hpp"
#include "../AbstractComponent.h"
#include "../../../enum/ComponentType.h"
#include "../../../enum/RotationType.h"

namespace PEngine {

    struct MovementComponent : public AbstractComponent {
        glm::mat4 previousModelMatrix{};
        glm::mat4 matrix{};
        glm::mat4 baseTransformationMatrix{};
        glm::vec3 translation{};
        glm::vec3 pivotPoint{};
        glm::vec3 absoluteTranslation{};
        glm::vec3 scale = glm::vec3(1, 1, 1);
        glm::vec3 rotationEuler{};
        glm::vec4 rotationQuaternion = glm::vec4(0, 0, 0, 1);
        glm::vec4 rotationQuaternionFinal = glm::vec4(0, 0, 0, 1);
        RotationType rotationType = RotationType::ROTATION_QUATERNION;
        bool changed = false;
        bool changesApplied = true;
        bool isUnderChange = false;
        bool lockedRotation = false;
        bool lockedTranslation = false;
        bool lockedScaling = false;

        explicit MovementComponent() : AbstractComponent(ComponentType::MOVEMENT) {}

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["rotationType"] = rotationType;
            json["lockedRotation"] = lockedRotation;
            json["lockedTranslation"] = lockedTranslation;
            json["lockedScaling"] = lockedScaling;

            json["previousModelMatrix"] = Dump(previousModelMatrix);
            json["matrix"] = Dump(matrix);
            json["baseTransformationMatrix"] = Dump(baseTransformationMatrix);
            json["translation"] = Dump(translation);
            json["pivotPoint"] = Dump(pivotPoint);
            json["absoluteTranslation"] = Dump(absoluteTranslation);
            json["scale"] = Dump(scale);
            json["rotationEuler"] = Dump(rotationEuler);
            json["rotationQuaternion"] = Dump(rotationQuaternion);
            json["rotationQuaternionFinal"] = Dump(rotationQuaternionFinal);

            return json;
        }

        void parse(nlohmann::json &data) override {
            ParseInto(data["previousModelMatrix"], previousModelMatrix);
            ParseInto(data["matrix"], matrix);
            ParseInto(data["baseTransformationMatrix"], baseTransformationMatrix);
            ParseInto(data["translation"], translation);
            ParseInto(data["pivotPoint"], pivotPoint);
            ParseInto(data["absoluteTranslation"], absoluteTranslation);
            ParseInto(data["scale"], scale);
            ParseInto(data["rotationEuler"], rotationEuler);
            ParseInto(data["rotationQuaternion"], rotationQuaternion);
            ParseInto(data["rotationQuaternionFinal"], rotationQuaternionFinal);

            rotationType = data["rotationType"];
            lockedRotation = data["lockedRotation"];
            lockedTranslation = data["lockedTranslation"];
            lockedScaling = data["lockedScaling"];
        }
    };

}

#endif
