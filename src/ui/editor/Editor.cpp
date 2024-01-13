#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "basic/Runner.h"
#include "../../util/FS.h"
#include "../WindowRepository.h"

#define RELOAD "RELOAD"
#define GET_PROJECT_PATH "GET_PROJECT_PATH"
#define SET_PROJECT_PATH "SET_PROJECT_PATH"

namespace PEngine {
    std::string Editor::projectPath;

    IRunner *Editor::initialize() {
        if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress)) {
            CONSOLE_ERROR("Failed to initialize GLAD")
            return nullptr;
        }
        WindowRepository::Get().getWebView()->addMessageListener(RELOAD, onMessage);
        WindowRepository::Get().getWebView()->addMessageListener(GET_PROJECT_PATH, onMessage);
        WindowRepository::Get().getWebView()->addMessageListener(SET_PROJECT_PATH, onMessage);
        return new Runner();
    }

    void Editor::onMessage(WebViewPayload &payload) {
        if (payload.id == RELOAD) {
            payload.webview->getWebView()->Reload();
        } else if (payload.id == GET_PROJECT_PATH) {
            payload.resolve(projectPath);
        } else if (payload.id == SET_PROJECT_PATH) {
            projectPath = payload.payload;
        }
    }

    const char *Editor::getWebViewHTML() {
        return "editor-window.html";
    }
}
