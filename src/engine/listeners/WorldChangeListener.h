#ifndef PROJECTION_WORLDCHANGELISTENER_H
#define PROJECTION_WORLDCHANGELISTENER_H

namespace PEngine {
    class WorldService;

    class Entity;

    class Engine;

    class WebViewPayload;

    struct WorldChangeListener {
        static void RenameEntity(WebViewPayload &payload, Engine &engine, WorldService *world);

        static void ToggleActive(WebViewPayload &payload, Engine &engine, WorldService *world);

        static void DeleteEntity(WebViewPayload &payload, Engine &engine, WorldService *world);

        static void AddEntity(WebViewPayload &payload, Engine &engine, WorldService *world);

        static void AddComponent(WebViewPayload &payload,  WorldService *world);

        static void GetEntity(WebViewPayload &payload, WorldService *world);

        static void GetEntityComponents(WebViewPayload &payload, WorldService *world);

        static void UpdateComponent(WebViewPayload &payload, Engine &engine, WorldService *world);

        static void UpdateEntity(WebViewPayload &payload, WorldService *world);
    };

}

#endif
