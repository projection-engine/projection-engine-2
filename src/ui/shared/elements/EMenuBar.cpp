#include "EMenuBar.h"
#include "imgui.h"

namespace PEngine {
    void EMenuBar::render() {
        if (!mainMenu) {
            if(ImGui::BeginMenuBar()) {
                renderChildren();
                ImGui::EndMenuBar();
            }
        } else {
            if(ImGui::BeginMainMenuBar()){
                renderChildren();
                ImGui::EndMainMenuBar();
            }
        }
    }

    void EMenuBar::collectAttributes(pugi::xml_node node) {
        if(!node.attribute("isMainMenu").empty()) {
            mainMenu = node.attribute("isMainMenu").as_bool();
        }
    }

    IElement *EMenuBar::copy() {
        return new EMenuBar;
    }
}