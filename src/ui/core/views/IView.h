#pragma once
#ifndef CATALYST_IVIEW_H
#define CATALYST_IVIEW_H

#include <string>
#include "../elements/IElement.h"

namespace PEngine {

    class IView : public IElement {
    public:

        /**
         * Executed before removal, useful for unloading core
         */
        virtual void onDestroy();

        /**
         * Executed every frame
         */
        virtual void update();

    };
}
#endif
