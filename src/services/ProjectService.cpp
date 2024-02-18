#include "ProjectService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "basic/FSController.h"
#include "Editor.h"


#define RELOAD "RELOAD"
#define GET_PROJECT_PATH "GET_PROJECT_PATH"
#define SET_PROJECT_PATH "SET_PROJECT_PATH"


namespace PEngine {
    void ProjectService::HandleEvent(WebViewPayload &payload) {
        if (payload.id == RELOAD) {
            payload.webview->getWebView()->Reload();
        } else if (payload.id == GET_PROJECT_PATH) {
            payload.resolve(((Editor *)payload.window)->projectPath);
        } else if (payload.id == SET_PROJECT_PATH) {
            ((Editor *)payload.window)->projectPath = payload.payload;
        }
    }

    void ProjectService::BindEvents(WebViewWindow *pWindow) {
        pWindow->addMessageListener(RELOAD, HandleEvent);
        pWindow->addMessageListener(GET_PROJECT_PATH, HandleEvent);
        pWindow->addMessageListener(SET_PROJECT_PATH, HandleEvent);
    }
}
