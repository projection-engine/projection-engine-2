#ifndef PROJECTION_PROJECTS_H
#define PROJECTION_PROJECTS_H

#include "../shared//AbstractWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class WebViewWindow;

    class Projects : public AbstractWindow {
    private:
        static void onMessage(WebViewPayload &payload);

    public:

        explicit Projects() : AbstractWindow("Projects") {}

        IRunner *initialize() override;
    };
}

#endif
