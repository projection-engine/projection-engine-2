#include <filesystem>
#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "basic/Runner.h"
#include "../../util/FS.h"

#define RELOAD "RELOAD"
#define LOAD_PROJECT "LOAD_PROJECT"

namespace PEngine {
    IRunner *Editor::initialize() {
        if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress)) {
            CONSOLE_ERROR("Failed to initialize GLAD")
            return nullptr;
        }
        addWebView("editor-window.html");
        addWebViewEventListener(RELOAD, onMessage);
        addWebViewEventListener(LOAD_PROJECT, onMessage);
        return new Runner(window);
    }

    void Editor::onMessage(WebViewPayload &payload) {
        if (payload.id == LOAD_PROJECT) {
            auto *window = dynamic_cast<Editor *>(payload.window);
            const std::string &result = FS::ReadFile(window->getProject());
            payload.resolve(result.c_str());
        } else if (payload.id == RELOAD) {
            payload.webview->getWebView()->Reload();
        }
    }

    void Editor::setProject(const std::string &pathToMetadata) {
        projectPath = pathToMetadata;
    }

    const std::string &Editor::getProject() {
        return projectPath;
    }
}
