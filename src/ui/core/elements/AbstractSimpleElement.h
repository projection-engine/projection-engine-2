#ifndef CATALYST_ABSTRACT_SIMPLE_ELEMENT_H
#define CATALYST_ABSTRACT_SIMPLE_ELEMENT_H

#include "IElement.h"

namespace PEngine {

    class AbstractSimpleElement : public IElement {
    protected:
        std::string text;
    public:
        void setText(std::string textV);

        const std::string &getText() const;
    };

}

#endif
