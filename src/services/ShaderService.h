#ifndef PROJECTION_SHADERSERVICE_H
#define PROJECTION_SHADERSERVICE_H

#include "AbstractService.h"

namespace PEngine {

    class ShaderService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:

        static std::string RequestShader(const std::string &shaderFileName);

        void BindEvents(PEngine::WebViewWindow *pWindow) override;
    };

}

#endif
