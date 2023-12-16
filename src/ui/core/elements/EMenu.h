#ifndef CATALYST_EMENU_H
#define CATALYST_EMENU_H

#include "IElement.h"
#include "AbstractTitledElement.h"

namespace PEngine {

    class EMenu : public AbstractTitledElement {
    public:
        void render() override;

        IElement * copy() override;
    };

}

#endif
