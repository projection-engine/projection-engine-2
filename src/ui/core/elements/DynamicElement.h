#ifndef CATALYST_DYNAMICELEMENT_H
#define CATALYST_DYNAMICELEMENT_H

#include "IElement.h"

namespace PEngine {
    /**
     * Can be added as child to any other element and have a custom rendering implementation
     */
    class DynamicElement : IElement {
    private:
        void (*renderElements)(IElement *element);

        IElement *element;
    public:

        explicit DynamicElement(IElement *element, void(*renderElements)(IElement *element));

        void render() override;
    };

}

#endif
