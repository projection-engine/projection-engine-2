#include "IOController.h"
#include "../../../core/structures/Map.cpp"

namespace PEngine {
    Map<int, bool> IOController::pressedKeys;

    bool IOController::isMouseButtonDown(int index) {
        if (index >= MAX_SIZE_MOUSE) {
            return false;
        }
        return io.MouseDown[index];
    }

    float IOController::getMouseY() {
        return io.MousePos.y;
    }

    float IOController::getMouseX() {
        return io.MousePos.x;
    }

    float IOController::getMouseDeltaY() {
        return io.MouseDelta.y;
    }

    float IOController::getMouseDeltaX() {
        return io.MouseDelta.x;
    }

    bool IOController::isMousePosValid() {
        return ImGui::IsMousePosValid();
    }

    float IOController::getMouseButtonDuration(int index) {
        if (index >= MAX_SIZE_MOUSE) {
            return false;
        }
        return io.MouseDownDuration[index];
    }

    float IOController::getMouseWheelAcceleration() {
        return io.MouseWheel;
    }

    Map<int, bool> *IOController::getPressedKeys() {
        for (auto key = (ImGuiKey) 0; key < ImGuiKey_NamedKey_END; key = (ImGuiKey) (key + 1)) {
            pressedKeys.set(key, !ImGui::IsKeyDown(key));
        }

        return &pressedKeys;
    }

    bool IOController::isSuper() {
        return io.KeySuper;
    }

    bool IOController::isShift() {
        return io.KeyShift;
    }

    bool IOController::isCTRL() {
        return io.KeyCtrl;
    }

    bool IOController::isAlt() {
        return io.KeyAlt;
    }


}