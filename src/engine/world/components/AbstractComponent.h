#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "../AbstractEntity.h"

namespace PEngine {
    struct AbstractComponent {
        AbstractEntity *entity = nullptr;
    };
}
#endif
