#ifndef PROJECTION_EXAMPLE_H
#define PROJECTION_EXAMPLE_H


#include "../../../src/ui/shared/views/IView.h"

namespace PEngine{
    class Example : public IView{
    public:
        IElement * copy() override;
    };
}


#endif
