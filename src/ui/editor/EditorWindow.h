#ifndef PROJECTION_EDITORWINDOW_H
#define PROJECTION_EDITORWINDOW_H

#include "../core/IWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class WebViewWindow;
    class EditorWindow : public IWindow {
    private:
        WebViewWindow *webView = nullptr;
        Engine engine = Engine(new IOController, new FSController);
        static void onWebViewInitialized(WebViewWindow *webView);
    public:

        explicit EditorWindow();

        void onInitialize() override;
    };
}

#endif
