#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "Entity.h"
#include "../../enum/ComponentType.h"


namespace PEngine {
    struct AbstractComponent : public AbstractSerializable {
        Entity *entity = nullptr;

        virtual nlohmann::json serialize();

        ComponentType &componentType;

        explicit AbstractComponent(ComponentType &type) : componentType(type) {}


    };
}
#endif
