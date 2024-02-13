#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "Entity.h"

namespace PEngine {
    struct AbstractComponent : public AbstractSerializable {
        Entity *entity = nullptr;
    };
}
#endif
