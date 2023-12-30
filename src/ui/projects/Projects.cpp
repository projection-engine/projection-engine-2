#include "Projects.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"
#include "../../util/FileSystemUtil.h"

#define RPC "READ_PROJECTS_CACHE"
#define RELOAD "RELOAD"
#define CREATE_P "CREATE_PROJECT"

namespace PEngine {
    IRunner *Projects::initialize() {
        IWindow::initialize();
        addWebView(PROJECTS_WINDOW, "project-window.html");
        addWebViewEventListener(PROJECTS_WINDOW, RELOAD, onMessage);
        addWebViewEventListener(PROJECTS_WINDOW, CREATE_P, onMessage);
        addWebViewEventListener(PROJECTS_WINDOW, RPC, onMessage);
        return nullptr;
    }

    void Projects::onMessage(WebViewPayload &payload) {
        if (payload.id == RPC) {
            const char *result = FileSystemUtil::ReadFile(FileSystemUtil::GetCurrentPath() + "/projects-cache.json");
            payload.resolve(result);
        } else if (payload.id == CREATE_P) {
            FileSystemUtil::CreateDirectory(FileSystemUtil::GetCurrentPath() + "/projects/" + payload.payload);
            // TODO - SWITCH WINDOW
        } else {
            payload.webview->getWebView()->Reload();
        }
    }
}
