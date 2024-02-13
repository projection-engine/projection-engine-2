#ifndef PROJECTION_WORLDHIERARCHYLISTENER_H
#define PROJECTION_WORLDHIERARCHYLISTENER_H

#include "nlohmann/json.hpp"

namespace PEngine {
    class WorldService;

    class Entity;

    class Engine;

    class WebViewPayload;

    struct WorldHierarchyListener {
        static void GetHierarchy(nlohmann::json &json,
                                 WorldService *world,
                                 std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &hierarchy,
                                 Entity *entity);

        static void PostHierarchy(WebViewPayload &payload, PEngine::Engine &engine);

        static void PostSelectedEntities(const WebViewPayload &payload, Engine &engine);

        static void PostLockedEntity(const WebViewPayload &payload, Engine &engine);

        static void LockEntity(WebViewPayload &payload, Engine &engine);

        static void SelectEntities(WebViewPayload &payload, Engine &engine);
    };

}

#endif
