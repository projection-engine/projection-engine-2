#include <filesystem>
#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "basic/Runner.h"
#include "../shared/ImGuiContextUtil.h"

#define RELOAD "RELOAD"
#define LOAD_PROJECT "LOAD_PROJECT"

namespace PEngine {
    IRunner *Editor::initialize() {
        IWindow::initialize();
        if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress)) {
            CONSOLE_ERROR("Failed to initialize GLAD")
            return nullptr;
        }
        addWebView(EDITOR_WINDOW, "editor-window.html");
        addWebViewEventListener(EDITOR_WINDOW, "RELOAD", onMessage);
        ImGuiContextUtil::initialize(window);
        return new Runner(window);
    }

    void Editor::onMessage(WebViewPayload &payload) {
        if (payload.id == LOAD_PROJECT) {
            // TODO - LOAD
        } else if (payload.id == RELOAD) {
            payload.webview->getWebView()->Reload();
        }
    }

    void Editor::setProject(const std::string &pathToMetadata) {
        projectPath = pathToMetadata;
    }
}
