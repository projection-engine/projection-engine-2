#include "EIcon.h"
#include "imgui.h"

#include <utility>

namespace PEngine {

    void EIcon::render() {
        ImGui::Text("%s", text.c_str());
    }

    void EIcon::setText(std::string textV) {
        text = std::move(textV);
    }

    void EIcon::collectAttributes(pugi::xml_node node) {
        setText(node.text().as_string());
    }

    IElement *EIcon::copy() {
        return new EIcon;
    }
}
