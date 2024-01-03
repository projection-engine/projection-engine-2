#ifndef PROJECTION_PROJECTS_H
#define PROJECTION_PROJECTS_H

#include "../shared//AbstractWindow.h"

namespace PEngine {
    class WebViewWindow;

    class Projects : public AbstractWindow {
    private:
        static void onMessage(WebViewPayload &payload);

    public:

        explicit Projects() : AbstractWindow("Projects") {}

        IRunner *initialize() override;

        const char * getWebViewHTML() override;
    };
}

#endif
