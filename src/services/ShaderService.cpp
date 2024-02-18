#include "ShaderService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "../engine/util/ShaderUtil.h"
#include "basic/FSController.h"

#define REQUEST_SHADER "REQUEST_SHADER"

namespace PEngine {
    void ShaderService::HandleEvent(WebViewPayload &payload) {
        if (payload.id == REQUEST_SHADER) {
            FSController fs;
            payload.resolve(ShaderUtil::RequestShader(&fs, (payload.payload), false));
        }
    }

    void ShaderService::BindEvents(WebViewWindow *pWindow) {
        pWindow->addMessageListener(REQUEST_SHADER, HandleEvent);
    }
}
