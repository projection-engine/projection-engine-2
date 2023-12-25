#include "Projects.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"

namespace PEngine {
    IRunner *Projects::initialize() {
        IWindow::initialize();
        addWebView(PROJECTS_WINDOW, "project-window.html");
        addWebViewEventListener(PROJECTS_WINDOW, "RELOAD", onMessage);
        return nullptr;
    }

    void Projects::onMessage(WebViewPayload &payload) {
        payload.webview->Reload();
    }
}
