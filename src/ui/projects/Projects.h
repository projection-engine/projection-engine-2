#ifndef PROJECTION_PROJECTS_H
#define PROJECTION_PROJECTS_H

#include "../shared//IWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class WebViewWindow;

    class Projects : public IWindow {
    private:
        static void onMessage(WebViewPayload &payload);

    public:

        explicit Projects() : IWindow("Projects") {}

        IRunner *initialize() override;
    };
}

#endif
