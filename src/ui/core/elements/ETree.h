#ifndef CATALYST_ETREE_H
#define CATALYST_ETREE_H

#include "AbstractSimpleElement.h"

namespace PEngine {

    class ETree : public AbstractSimpleElement  {
    public:
        void render() override;

        IElement * copy() override;
    };

}

#endif
