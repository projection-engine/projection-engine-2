#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/AbstractWindow.h"

namespace PEngine {
    class WebViewWindow;

    class IRunner;

    class Editor : public AbstractWindow {
    private:
        static void onMessage(WebViewPayload &payload);

    public:

        explicit Editor() : AbstractWindow("Project Editor") {}

        IRunner *initialize() override;

        const char *getWebViewHTML() override;
    };
}

#endif
