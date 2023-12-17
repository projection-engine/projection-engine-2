#include "AbstractTitledElement.h"

namespace PEngine {

    std::string AbstractTitledElement::getTitle() {
        return title;
    }

    void AbstractTitledElement::setTitle(std::string t) {
        title = std::move(t);
    }

    void AbstractTitledElement::collectAttributes(pugi::xml_node node) {
        if(!node.attribute("title").empty()) {
            title = node.attribute("title").as_string();
        }
    }
}