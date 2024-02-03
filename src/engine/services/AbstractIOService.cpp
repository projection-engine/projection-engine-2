
#include "AbstractIOService.h"

namespace PEngine {
    bool AbstractIOService::isMousePosValid() {
        return false;
    }

    float AbstractIOService::getMouseWheelAcceleration() {
        return 0;
    }

    float AbstractIOService::getMouseDeltaX() {
        return 0;
    }

    float AbstractIOService::getMouseY() {
        return 0;
    }

    float AbstractIOService::getMouseX() {
        return 0;
    }

    bool AbstractIOService::isMouseButtonDown(int index) {
        return false;
    }

    float AbstractIOService::getMouseDeltaY() {
        return 0;
    }

    float AbstractIOService::getMouseButtonDuration(int index) {
        return 0;
    }

    Map<int, bool> *AbstractIOService::getPressedKeys() {
        return nullptr;
    }

    bool AbstractIOService::isCTRL() {
        return false;
    }

    bool AbstractIOService::isShift() {
        return false;
    }

    bool AbstractIOService::isAlt() {
        return false;
    }

    bool AbstractIOService::isSuper() {
        return false;
    }
}