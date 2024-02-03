#ifndef PROJECTION_SHADERSERVICE_H
#define PROJECTION_SHADERSERVICE_H

#include "AbstractService.h"

namespace PEngine {

    class ShaderService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:

        void BindEvents(PEngine::WebViewWindow *pWindow) override;
    };

}

#endif
