#ifndef PROJECTION_ENGINESERVICE_H
#define PROJECTION_ENGINESERVICE_H

#include "AbstractService.h"
#include "nlohmann/json.hpp"

namespace PEngine {
    class WorldService;

    struct Entity;

    class Engine;

    class EngineService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        void BindEvents(PEngine::WebViewWindow *pWindow) override;

        static void UpdateEngineState(WebViewPayload &payload, Engine &engine);

        static void GetEngineState(WebViewPayload &payload, Engine &engine);
    };

}

#endif
