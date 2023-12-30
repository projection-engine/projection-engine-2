#include "Projects.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"
#include "../../util/FileSystemUtil.h"

#define RPC "READ_PROJECTS_CACHE"
#define RELOAD "RELOAD"
namespace PEngine {
    IRunner *Projects::initialize() {
        IWindow::initialize();
        addWebView(PROJECTS_WINDOW, "project-window.html");
        addWebViewEventListener(PROJECTS_WINDOW, RELOAD, onMessage);
        addWebViewEventListener(PROJECTS_WINDOW, RPC, onMessage);
        return nullptr;
    }

    void Projects::onMessage(WebViewPayload &payload) {
        if(payload.id == RPC){

            const char *result = FileSystemUtil::ReadFile(FileSystemUtil::GetCurrentPath() + "/projects-cache.json");
            payload.resolve(result);
        }else {
            payload.webview->getWebView()->Reload();
        }
    }
}
