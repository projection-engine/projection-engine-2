#include "EMenu.h"
#include "imgui.h"

namespace PEngine {
    void EMenu::render() {
        if(ImGui::BeginMenu(title.c_str())) {
            renderChildren();
            ImGui::EndMenu();
        }
    }

    IElement *EMenu::copy() {
        return new EMenu;
    }
}