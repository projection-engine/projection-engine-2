#ifndef PROJECTION_SHADERSERVICE_H
#define PROJECTION_SHADERSERVICE_H

#include "../ui/AbstractService.h"

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class ShaderService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

        static void BindEvents(PEngine::WebViewWindow &pWindow);

    public:
        void bindEvents(PEngine::WebViewWindow &webView) override {
            BindEvents(webView);
        }
    };

}

#endif
