#pragma once
#ifndef PROJECTION_ABSTRACTCOMPONENT_H
#define PROJECTION_ABSTRACTCOMPONENT_H

#include "../AbstractEntity.h"

namespace PEngine {
    class AbstractComponent {
    protected:
        AbstractEntity *entity = nullptr;
    public:
        AbstractEntity *getEntity();

        void setEntity(AbstractEntity *entity);
    };
}
#endif
