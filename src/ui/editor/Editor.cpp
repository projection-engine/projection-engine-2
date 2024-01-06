#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "basic/Runner.h"
#include "../../util/FS.h"
#include "../WindowRepository.h"

#define RELOAD "RELOAD"

namespace PEngine {
    IRunner *Editor::initialize() {
        if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress)) {
            CONSOLE_ERROR("Failed to initialize GLAD")
            return nullptr;
        }
        WindowRepository::Get().getWebView()->addMessageListener(RELOAD, onMessage);
        return new Runner();
    }

    void Editor::onMessage(WebViewPayload &payload) {
        payload.webview->getWebView()->Reload();
    }

    const char *Editor::getWebViewHTML() {
        return "editor-window.html";
    }
}
