#include "AbstractSimpleElement.h"

namespace PEngine {
    void AbstractSimpleElement::setText(std::string textV) {
        text = std::move(textV);
    }

    const std::string &AbstractSimpleElement::getText() const {
        return text;
    }
}