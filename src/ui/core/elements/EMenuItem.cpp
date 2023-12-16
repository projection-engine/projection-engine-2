#include "EMenuItem.h"
#include "imgui.h"
#include "../../../core/event/EventController.h"

namespace PEngine {
    void EMenuItem::render() {
        if (ImGui::MenuItem(title.c_str(), shortcut.c_str(), checked, enabled)) {
            EventController::get()->triggerEvent("click", this);
        }
        if (addSeparator) {
            ImGui::Separator();
        }
    }

    void EMenuItem::setShortcut(std::string t) {
        shortcut = std::move(t);
    }

    std::string EMenuItem::getShortcut() {
        return shortcut;
    }

    void EMenuItem::collectAttributes(pugi::xml_node node) {
        AbstractTitledElement::collectAttributes(node);
        if (!node.attribute("shortcut").empty())
            shortcut = node.attribute("shortcut").as_string();
        if (!node.attribute("enabled").empty())
            enabled = node.attribute("enabled").as_bool();
        if (!node.attribute("checked").empty())
            checked = node.attribute("checked").as_bool();
        if (!node.attribute("addSeparator").empty())
            addSeparator = node.attribute("addSeparator").as_bool();
    }

    IElement *EMenuItem::copy() {
        return new EMenuItem;
    }

}