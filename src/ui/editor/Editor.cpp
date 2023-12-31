#include <filesystem>
#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"
#include "basic/Runner.h"

namespace PEngine {
    IRunner* Editor::initialize() {
        IWindow::initialize();
        if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress)) {
            CONSOLE_ERROR("Failed to initialize GLAD")
            return nullptr;
        }
        addWebView(EDITOR_WINDOW, "project-window.html");
        addWebViewEventListener(EDITOR_WINDOW, "RELOAD", onMessage);
        return new Runner(window);
    }

    void Editor::onMessage(WebViewPayload &payload) {
        payload.webview->getWebView()->Reload();
    }
}
