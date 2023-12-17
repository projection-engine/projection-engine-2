
#include "IIOController.h"

namespace PEngine {
    bool IIOController::isMousePosValid() {
        return false;
    }

    float IIOController::getMouseWheelAcceleration() {
        return 0;
    }

    float IIOController::getMouseDeltaX() {
        return 0;
    }

    float IIOController::getMouseY() {
        return 0;
    }

    float IIOController::getMouseX() {
        return 0;
    }

    bool IIOController::isMouseButtonDown(int index) {
        return false;
    }

    float IIOController::getMouseDeltaY() {
        return 0;
    }

    float IIOController::getMouseButtonDuration(int index) {
        return 0;
    }

    Map<int, bool> *IIOController::getPressedKeys() {
        return nullptr;
    }

    bool IIOController::isCTRL() {
        return false;
    }

    bool IIOController::isShift() {
        return false;
    }

    bool IIOController::isAlt() {
        return false;
    }

    bool IIOController::isSuper() {
        return false;
    }
}