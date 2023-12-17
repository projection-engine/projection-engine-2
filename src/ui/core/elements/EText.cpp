#include "EText.h"
#include "imgui.h"

#include <utility>

namespace PEngine {

    void EText::render() {
        ImGui::Text("%s", text.c_str());
    }

    void EText::collectAttributes(pugi::xml_node node) {
        setText(node.text().as_string());
    }

    IElement *EText::copy() {
        return new EText;
    }
}
