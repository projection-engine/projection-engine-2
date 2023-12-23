#include "DynamicElement.h"

namespace PEngine {
    void DynamicElement::render() {
        renderElements(element);
    }

    DynamicElement::DynamicElement(IElement *element, void (*renderElements)(IElement*element)) {
        this->element = element;
        DynamicElement::renderElements = renderElements;
    }
}