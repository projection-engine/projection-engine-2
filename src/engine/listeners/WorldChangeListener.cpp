#include "WorldChangeListener.h"
#include "../services/WorldService.h"
#include  "../Engine.h"
#include  "../services/world/AbstractComponent.h"
#include  "../../ui/shared/webview/WebViewPayload.h"
#include  "../../ui/shared/webview/WebViewWindow.h"
#include "nlohmann/json.hpp"
#include "WorldHierarchyListener.h"
#include "../enum/EngineEvents.h"

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

    void WorldChangeListener::UpdateEntity(WebViewPayload &payload, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("entityID").get<uint32_t>());
        entity->parse(parsed);
        GetEntity(payload, world);
    }

    void WorldChangeListener::UpdateComponent(WebViewPayload &payload, Engine &engine, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());
        ComponentType componentType = ComponentType::Of(parsed.at("componentType").get<std::string>());
        AbstractComponent &component = world->getComponent(componentType, entity);
        component.parse(parsed["component"]);

        GetEntityComponents(payload, world);
    }

    void WorldChangeListener::GetEntityComponents(WebViewPayload &payload, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());
        std::vector<std::string> &components = world->getComponentList(entity);
        nlohmann::json response;

        for (const auto &component: components) {
            ComponentType componentType = ComponentType::Of(component);
            AbstractComponent &abstractComponent = world->getComponent(componentType, entity);
            response.push_back(abstractComponent.serialize());
        }
        payload.webview->postMessage(response.dump(), EngineEvents::GET_ENTITY_COMPONENTS);
    }

    void WorldChangeListener::GetEntity(WebViewPayload &payload, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());

        payload.webview->postMessage(entity->serialize().dump(), EngineEvents::GET_ENTITY);
    }

    void WorldChangeListener::AddComponent(WebViewPayload &payload, WorldService *world) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        Entity *entity = world->getEntity(parsed.at("id").get<uint32_t>());
        ComponentType componentType = ComponentType::Of(parsed.at("value").get<std::string>());
        world->addComponent(componentType, entity);
        GetEntityComponents(payload, world);
    }
}
