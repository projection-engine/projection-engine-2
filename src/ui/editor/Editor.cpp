#include "Editor.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "basic/Runner.h"
#include "../WindowRepository.h"
#include "../../services/FileSystemService.h"
#include "../../services/ShaderService.h"
#include "../../services/EngineService.h"

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
        WebViewWindow *webView = WindowRepository::Get().getWebView();
        webView->addMessageListener(RELOAD, onMessage);
        webView->addMessageListener(GET_PROJECT_PATH, onMessage);
        webView->addMessageListener(SET_PROJECT_PATH, onMessage);
        FileSystemService::BindEvents(webView);
        EngineService::BindEvents(webView);
        ShaderService::BindEvents(webView);
        return new Runner(engine);
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

    Engine &Editor::getEngine() {
        return engine;
    }
}
