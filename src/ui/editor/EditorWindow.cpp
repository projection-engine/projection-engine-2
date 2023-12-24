#include <filesystem>
#include <iostream>
#include "EditorWindow.h"
#include "../shared/runners/Runner.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"

namespace PEngine {
    void EditorWindow::initialize() {
        IWindow::initialize();
        document.setEngine(&engine);
        const char *WEBVIEW_ID = "TEST";
        addWebView(WEBVIEW_ID, "project-window.html");
        addWebViewEventListener(WEBVIEW_ID, "RELOAD", onMessage);
    }

    IRunner *EditorWindow::createRunner() {
        return new Runner(window, document);
    }

    void EditorWindow::onMessage(WebViewPayload &payload) {
        payload.webview->Reload();
    }
}
