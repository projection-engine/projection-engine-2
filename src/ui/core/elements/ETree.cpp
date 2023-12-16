#include "ETree.h"
#include "imgui.h"

namespace PEngine {
    void ETree::render() {
        if(ImGui::TreeNode(text.c_str())){
            renderChildren();
            ImGui::TreePop();
        }
    }

    IElement *ETree::copy() {
        return new ETree;
    }
}