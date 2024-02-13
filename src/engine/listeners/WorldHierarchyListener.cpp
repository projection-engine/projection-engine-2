#include "WorldHierarchyListener.h"
#include "../services/WorldService.h"
#include  "../Engine.h"
#include  "../services/world/Entity.h"
#include  "../../ui/shared/webview/WebViewPayload.h"
#include  "../../ui/shared/webview/WebViewWindow.h"
#include "../enum/EngineEvents.h"

namespace PEngine {
    void WorldHierarchyListener::SelectEntities(WebViewPayload &payload, Engine &engine) {
        std::vector<uint32_t> &vec = engine.getState().selected;
        vec.clear();
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        for (uint32_t element: parsed) {
            vec.push_back(element);
        }
        PostSelectedEntities(payload, engine);
    }

    void WorldHierarchyListener::LockEntity(WebViewPayload &payload, Engine &engine) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        engine.getState().lockedEntity = parsed.at("id").get<uint32_t>();
        PostLockedEntity(payload, engine);
    }

    void WorldHierarchyListener::PostSelectedEntities(const WebViewPayload &payload, Engine &engine) {
        nlohmann::json result = engine.getState().selected;
        payload.webview->postMessage(result.dump(), EngineEvents::GET_SELECTED_ENTITIES);
    }

    void WorldHierarchyListener::PostLockedEntity(const WebViewPayload &payload, Engine &engine) {
        nlohmann::json j;
        j["id"] = engine.getState().lockedEntity;
        payload.webview->postMessage(j.dump(), EngineEvents::GET_LOCKED_ENTITY);
        payload.resolve(j.dump());
    }

    void WorldHierarchyListener::PostHierarchy(WebViewPayload &payload, Engine &engine) {
        WorldService *world = engine.getWorldService();
        std::unordered_map<uint32_t, std::vector<uint32_t>> hierarchy = world->getParentChildren();
        nlohmann::json json;
        GetHierarchy(json, world, hierarchy, &world->getRoot());
        payload.webview->postMessage(json.dump(), EngineEvents::GET_HIERARCHY);
    }

    void WorldHierarchyListener::GetHierarchy(nlohmann::json &json,
                                              WorldService *world,
                                              std::unordered_map<std::uint32_t, std::vector<std::uint32_t>> &hierarchy,
                                              Entity *entity) {
        std::vector<nlohmann::json> children;
        json["name"] = entity->name;
        json["entityID"] = entity->getEntityId();
        json["components"] = world->getComponentList(entity);
        json["isActive"] = entity->active;
        if (hierarchy.count(entity->getEntityId())) {
            for (auto child: hierarchy[entity->getEntityId()]) {
                nlohmann::json childJson;
                GetHierarchy(childJson, world, hierarchy, world->getEntity(child));
                children.push_back(childJson);
            }
        }
        json["children"] = children;
    }
}
