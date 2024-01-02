#include "Projects.h"
#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "WebView2.h"
#include "../../util/FS.h"
#include "nlohmann/json.hpp"
#include "ProjectsService.h"

#define RPC "READ_PROJECTS_CACHE"
#define RELOAD "RELOAD"
#define CREATE_P "CREATE_PROJECT"

namespace PEngine {
    IRunner *Projects::initialize() {
        addWebView( "project-window.html");
        addWebViewEventListener( RELOAD, onMessage);
        addWebViewEventListener( CREATE_P, onMessage);
        addWebViewEventListener( RPC, onMessage);
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
}
