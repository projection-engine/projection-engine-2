#include <filesystem>
#include <iostream>
#include "EditorWindow.h"
#include "runner/Runner.h"
#include "../core/webview/WebViewWindow.h"

namespace PEngine {
    void EditorWindow::onInitialize() {
        webView = new WebViewWindow(onWebViewInitialized);
        webView->initialize(window);

    }

    void EditorWindow::onWebViewInitialized(WebViewWindow *webView) {
        webView->setHTML("project-window.html");
    }

    EditorWindow::EditorWindow() : IWindow() {
        document.setEngine(&engine);
        runner = new Runner(window, document);
    }
}
