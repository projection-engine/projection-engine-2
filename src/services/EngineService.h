#ifndef PROJECTION_ENGINESERVICE_H
#define PROJECTION_ENGINESERVICE_H

#include "nlohmann/json.hpp"

namespace PEngine {
    class WorldService;

    struct Entity;

    class WebViewPayload;

    class WebViewWindow;

    class Engine;

    class EngineService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        static void BindEvents(PEngine::WebViewWindow *pWindow);

        static void UpdateEngineState(WebViewPayload &payload, Engine &engine);

        static void GetEngineState(WebViewPayload &payload, Engine &engine);
    };

}

#endif
