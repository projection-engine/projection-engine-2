#include "ESection.h"

namespace PEngine {
    void ESection::render() {
        ImGui::Begin(title.c_str(), nullptr, flags);
        renderChildren();
        ImGui::End();
    }

    IElement *ESection::copy() {
        return new ESection;
    }

    void ESection::collectAttributes(pugi::xml_node node) {
        AbstractTitledElement::collectAttributes(node);
        if (!node.attribute("noTitleBar").empty())
            noTitleBar = node.attribute("noTitleBar").as_bool();
        if (!node.attribute("noScrollbar").empty())
            noScrollbar = node.attribute("noScrollbar").as_bool();
        if (!node.attribute("menuBar").empty())
            menuBar = node.attribute("menuBar").as_bool();
        if (!node.attribute("noMove").empty())
            noMove = node.attribute("noMove").as_bool();
        if (!node.attribute("noResize").empty())
            noResize = node.attribute("noResize").as_bool();
        if (!node.attribute("noCollapse").empty())
            noCollapse = node.attribute("noCollapse").as_bool();
        if (!node.attribute("noNav").empty())
            noNav = node.attribute("noNav").as_bool();
        if (!node.attribute("noBackground").empty())
            noBackground = node.attribute("noBackground").as_bool();
        if (!node.attribute("noBringToFrontOnFocus").empty())
            noBringToFrontOnFocus = node.attribute("noBringToFrontOnFocus").as_bool();
        if (!node.attribute("noDocking").empty())
            noDocking = node.attribute("noDocking").as_bool();
        if (!node.attribute("unsavedDocument").empty())
            unsavedDocument = node.attribute("unsavedDocument").as_bool();

        loadFlags();
    }

    const ImVec2 &ESection::getSize() const {
        return size;
    }

    void ESection::setSize1(const ImVec2 &v) {
        ESection::size = v;
        loadFlags();
    }

    bool ESection::isNoTitleBar() const {
        return noTitleBar;
    }

    void ESection::setNoTitleBar(bool v) {
        ESection::noTitleBar = v;
        loadFlags();

    }

    bool ESection::isNoScrollbar() const {
        return noScrollbar;
    }

    void ESection::setNoScrollbar(bool v) {
        ESection::noScrollbar = v;
        loadFlags();

    }

    bool ESection::isMenuBar() const {
        return menuBar;
    }

    void ESection::setMenuBar(bool v) {
        ESection::menuBar = v;
        loadFlags();

    }

    bool ESection::isNoMove() const {
        return noMove;
    }

    void ESection::setNoMove(bool v) {
        ESection::noMove = v;
        loadFlags();

    }

    bool ESection::isNoResize() const {
        return noResize;
    }

    void ESection::setNoResize(bool v) {
        ESection::noResize = v;
        loadFlags();

    }

    bool ESection::isNoCollapse() const {
        return noCollapse;
    }

    void ESection::setNoCollapse(bool v) {
        ESection::noCollapse = v;
        loadFlags();

    }

    bool ESection::isNoNav() const {
        return noNav;
    }

    void ESection::setNoNav(bool v) {
        ESection::noNav = v;
        loadFlags();

    }

    bool ESection::isNoBackground() const {
        return noBackground;
    }

    void ESection::setNoBackground(bool v) {
        ESection::noBackground = v;
        loadFlags();

    }

    bool ESection::isNoBringToFrontOnFocus() const {
        return noBringToFrontOnFocus;
    }

    void ESection::setNoBringToFrontOnFocus(bool v) {
        ESection::noBringToFrontOnFocus = v;
        loadFlags();

    }

    bool ESection::isNoDocking() const {
        return noDocking;
    }

    void ESection::setNoDocking(bool v) {
        ESection::noDocking = v;
        loadFlags();

    }

    bool ESection::isUnsavedDocument() const {
        return unsavedDocument;
    }

    void ESection::setUnsavedDocument(bool v) {
        ESection::unsavedDocument = v;
        loadFlags();
    }

    void ESection::loadFlags() {
        flags = 0;
        if (noTitleBar)
            flags |= ImGuiWindowFlags_NoTitleBar;
        if (noScrollbar)
            flags |= ImGuiWindowFlags_NoScrollbar;
        if (menuBar)
            flags |= ImGuiWindowFlags_MenuBar;
        if (noMove)
            flags |= ImGuiWindowFlags_NoMove;
        if (noResize)
            flags |= ImGuiWindowFlags_NoResize;
        if (noCollapse)
            flags |= ImGuiWindowFlags_NoCollapse;
        if (noNav)
            flags |= ImGuiWindowFlags_NoNav;
        if (noBackground)
            flags |= ImGuiWindowFlags_NoBackground;
        if (noBringToFrontOnFocus)
            flags |= ImGuiWindowFlags_NoBringToFrontOnFocus;
        if (noDocking)
            flags |= ImGuiWindowFlags_NoDocking;
        if (unsavedDocument)
            flags |= ImGuiWindowFlags_UnsavedDocument;
    }
}