#pragma once
#ifndef CATALYST_ICOMPONENT_H
#define CATALYST_ICOMPONENT_H

#include "entt/entt.hpp"
#include "../IEntity.h"

namespace PEngine {
    class IComponent {
    protected:
        IEntity *entity = nullptr;
    public:
        IEntity *getEntity();

        void setEntity(IEntity *entity);
    };
}
#endif
