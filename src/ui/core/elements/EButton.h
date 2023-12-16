#ifndef CATALYST_EBUTTON_H
#define CATALYST_EBUTTON_H

#include "IElement.h"
#include "AbstractTitledElement.h"

namespace PEngine {

    class EButton : public AbstractTitledElement {
    private:
        bool clicked = false;
    public:

        bool isClicked() const;

        void render() override;

        IElement *copy() override;
    };

}

#endif
