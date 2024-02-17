#ifndef PROJECTION_SHADERSERVICE_H
#define PROJECTION_SHADERSERVICE_H

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class ShaderService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        static void BindEvents(PEngine::WebViewWindow *pWindow);
    };

}

#endif
