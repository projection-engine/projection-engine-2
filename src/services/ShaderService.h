#ifndef PROJECTION_SHADERSERVICE_H
#define PROJECTION_SHADERSERVICE_H

#include "../ui/AbstractService.h"

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class ShaderService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        static void BindEvents(WebViewWindow *pWindow);

    };

}

#endif
