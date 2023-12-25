#ifndef PROJECTION_INPUTSYSTEM_H
#define PROJECTION_INPUTSYSTEM_H

#include "ISystem.h"

namespace PEngine {

    class InputSystem : public ISystem {
    public:
        bool isEnabled() override;

        void run() override;
    };

}

#endif