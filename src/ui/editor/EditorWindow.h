#ifndef PROJECTION_EDITORWINDOW_H
#define PROJECTION_EDITORWINDOW_H

#include "../shared//IWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class WebViewWindow;

    class EditorWindow : public IWindow {
    private:
        Engine engine = Engine(new IOController, new FSController);

        static void onMessage(ICoreWebView2 *webView, ICoreWebView2WebMessageReceivedEventArgs *args, IWindow *window);

    protected:

        IRunner *createRunner() override;

    public:

        explicit EditorWindow() : IWindow("Project Editor") {}

        void initialize() override;
    };
}

#endif
