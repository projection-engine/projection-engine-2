#include <filesystem>
#include <iostream>
#include "EditorWindow.h"
#include "runner/Runner.h"
#include "../core/webview/WebViewWindow.h"

namespace PEngine {
    void EditorWindow::initialize() {
        IWindow::initialize();
        document.setEngine(&engine);
        addWebView("TEST", "project-window.html");
    }

    IRunner *EditorWindow::createRunner() {
        return new Runner(window, document);
    }
}
