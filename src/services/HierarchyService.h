#ifndef PROJECTION_HIERARCHYSERVICE_H
#define PROJECTION_HIERARCHYSERVICE_H

#include "AbstractService.h"
#include "nlohmann/json.hpp"
#include "../engine/Engine.h"

namespace PEngine {
    class WorldService;

    class Entity;

    class HierarchyService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        void BindEvents(PEngine::WebViewWindow *pWindow) override;

        static void GetHierarchy(nlohmann::json &json,
                                 WorldService *world,
                                 std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &hierarchy,
                                 Entity *entity);

        static void PostHierarchy(WebViewPayload &payload, PEngine::Engine &engine);
    };

}

#endif
