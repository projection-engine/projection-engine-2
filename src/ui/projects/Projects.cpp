#include "Projects.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"
#include "ProjectsService.h"
#include "../WindowRepository.h"
#define RPC "READ_PROJECTS_CACHE"
#define RELOAD "RELOAD"
#define CREATE_P "CREATE_PROJECT"

namespace PEngine {
    IRunner *Projects::initialize() {
        WindowRepository::Get().getWebView()->addMessageListener(RELOAD, onMessage);
        WindowRepository::Get().getWebView()->addMessageListener(CREATE_P, onMessage);
        WindowRepository::Get().getWebView()->addMessageListener(RPC, onMessage);
        return nullptr;
    }

    void Projects::onMessage(WebViewPayload &payload) {
        if (payload.id == RPC) {
            ProjectsService::readProjectsCache(payload);
        } else if (payload.id == CREATE_P) {
            ProjectsService::createProject(payload);
        } else {
            ProjectsService::reload(payload);
        }
    }

    const char *Projects::getWebViewHTML() {
        return "project-window.html";
    }
}
