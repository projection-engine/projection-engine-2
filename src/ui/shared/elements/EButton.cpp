#include "EButton.h"

#include <utility>
#include "imgui.h"

namespace PEngine {
    bool EButton::isClicked() const {
        return clicked;
    }

    void EButton::render() {
        clicked = ImGui::Button(title.c_str());
    }

    IElement *EButton::copy() {
        return new EButton;
    }
}