#pragma once
#ifndef PROJECTION_ICOMPONENT_H
#define PROJECTION_ICOMPONENT_H

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
