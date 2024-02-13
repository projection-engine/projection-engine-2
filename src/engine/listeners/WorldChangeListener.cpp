#include "WorldChangeListener.h"
#include "../services/WorldService.h"
#include  "../Engine.h"
#include  "../services/world/Entity.h"
#include  "../../ui/shared/webview/WebViewPayload.h"
#include  "../../ui/shared/webview/WebViewWindow.h"
#include "nlohmann/json.hpp"
#include "WorldHierarchyListener.h"

namespace PEngine {

    void WorldChangeListener::AddEntity(WebViewPayload &payload, Engine &engine, WorldService *world) {
        world->addEntity();
        WorldHierarchyListener::PostHierarchy(payload, engine);
    }

    void WorldChangeListener::DeleteEntity(WebViewPayload &payload, Engine &engine, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        uint32_t value = parsed.at("id").get<uint32_t>();
        world->removeEntity(value);
        WorldHierarchyListener::PostHierarchy(payload, engine);
    }

    void WorldChangeListener::ToggleActive(WebViewPayload &payload, Engine &engine, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());
        entity->active = !entity->active;
        WorldHierarchyListener::PostHierarchy(payload, engine);
    }

    void WorldChangeListener::RenameEntity(WebViewPayload &payload, Engine &engine, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());
        entity->name = parsed.at("name").get<std::string>();
        WorldHierarchyListener::PostHierarchy(payload, engine);
    }

    void WorldChangeListener::UpdateEntity(WebViewPayload &payload, Engine &engine, WorldService *world) {
// TODO
    }

    void WorldChangeListener::UpdateComponent(WebViewPayload &payload, Engine &engine, WorldService *world) {
// TODO
    }

    void WorldChangeListener::GetEntityComponents(WebViewPayload &payload, Engine &engine, WorldService *world) {
// TODO
    }

    void WorldChangeListener::GetEntity(WebViewPayload &payload, Engine &engine, WorldService *world) {
// TODO
    }

    void WorldChangeListener::AddComponent(WebViewPayload &payload, Engine &engine, WorldService *world) {
// TODO
    }

}
