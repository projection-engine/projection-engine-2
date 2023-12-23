#include "InputSystem.h"
#include "../../external/IIOController.h"
#include "../../../util/event/EventController.h"

#define MOUSE_0 0
#define MOUSE_1 1
#define MOUSE_2 2

namespace PEngine {
    void InputSystem::run() {
        if (io->isMouseButtonDown(MOUSE_0)) {
            EventController::get()->triggerEvent("mousedown");
        }
    }

    bool InputSystem::isEnabled() {
        return true;
    }
}