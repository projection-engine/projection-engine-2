#pragma once
#ifndef PROJECTION_IVIEW_H
#define PROJECTION_IVIEW_H

#include <string>
#include "../elements/IElement.h"

namespace PEngine {

    class IView : public IElement {
    public:

        /**
         * Executed before removal, useful for unloading shared
         */
        virtual void onDestroy();

        /**
         * Executed every frame
         */
        virtual void update();

    };
}
#endif
