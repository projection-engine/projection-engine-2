#include "EngineService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "../ui/editor/Editor.h"
#include "../engine/services/world/Entity.h"
#include "../ui/WindowRepository.h"
#include "nlohmann/json.hpp"

#define CREATE_ENTITY "CREATE_ENTITY"
#define DELETE_ENTITY "DELETE_ENTITY"
#define GET_HIERARCHY "GET_HIERARCHY"
#define SELECT_ENTITIES "SELECT_ENTITIES"
#define GET_SELECTED_ENTITIES "GET_SELECTED_ENTITIES"
#define LOCK_ENTITY "LOCK_ENTITY"
#define GET_LOCKED_ENTITY "GET_LOCKED_ENTITY"
#define TOGGLE_ACTIVE "TOGGLE_ACTIVE"
#define RENAME_ENTITY "RENAME_ENTITY"
#define MAKE_PARENT "MAKE_PARENT"

namespace PEngine {
    void EngineService::BindEvents(PEngine::WebViewWindow *pWindow) {
        pWindow->addMessageListener(CREATE_ENTITY, HandleEvent);
        pWindow->addMessageListener(DELETE_ENTITY, HandleEvent);
        pWindow->addMessageListener(GET_HIERARCHY, HandleEvent);
        pWindow->addMessageListener(SELECT_ENTITIES, HandleEvent);
        pWindow->addMessageListener(GET_SELECTED_ENTITIES, HandleEvent);
        pWindow->addMessageListener(LOCK_ENTITY, HandleEvent);
        pWindow->addMessageListener(GET_LOCKED_ENTITY, HandleEvent);
        pWindow->addMessageListener(MAKE_PARENT, HandleEvent);
        pWindow->addMessageListener(RENAME_ENTITY, HandleEvent);
        pWindow->addMessageListener(TOGGLE_ACTIVE, HandleEvent);
    }

    void EngineService::HandleEvent(WebViewPayload &payload) {
        Editor *window = (Editor *) WindowRepository::Get().getWindowById(EDITOR_WINDOW);
        Engine &engine = window->getEngine();
        WorldService *world = engine.getWorldService();

        if (payload.id == CREATE_ENTITY) {
            world->addEntity();
            PostHierarchy(payload, engine);
        } else if (payload.id == DELETE_ENTITY) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            std::uint32_t value = parsed.at("id").get<std::uint32_t>();
            world->removeEntity(value);
            PostHierarchy(payload, engine);
        } else if (payload.id == GET_HIERARCHY) {
            PostHierarchy(payload, engine);
        } else if (payload.id == TOGGLE_ACTIVE) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            Entity *entity = world->getEntity(parsed.at("id").get<std::uint32_t>());
            entity->active = !entity->active;
            PostHierarchy(payload, engine);
        } else if (payload.id == SELECT_ENTITIES) {
            std::vector<std::uint32_t> &vec = engine.getState().selected;
            vec.clear();
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            for (std::uint32_t element: parsed) {
                vec.push_back(element);
            }
            PostSelectedEntities(payload, engine);
        } else if (payload.id == GET_SELECTED_ENTITIES) {
            PostSelectedEntities(payload, engine);
        } else if (payload.id == LOCK_ENTITY) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            engine.getState().lockedEntity = parsed.at("id").get<std::uint32_t>();
            PostLockedEntity(payload, engine);
        } else if (payload.id == GET_LOCKED_ENTITY) {
            PostLockedEntity(payload, engine);
        } else if (payload.id == RENAME_ENTITY) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            Entity *entity = world->getEntity(parsed.at("id").get<std::uint32_t>());
            entity->name = parsed.at("name").get<std::string>();
            PostHierarchy(payload, engine);
        }
    }

    void EngineService::PostSelectedEntities(const WebViewPayload &payload, Engine &engine) {
        nlohmann::json result = engine.getState().selected;
        payload.webview->postMessage(result.dump(), GET_SELECTED_ENTITIES);
    }

    void EngineService::PostLockedEntity(const WebViewPayload &payload, Engine &engine) {
        nlohmann::json j;
        j["id"] = engine.getState().lockedEntity;
        payload.webview->postMessage(j.dump(), GET_LOCKED_ENTITY);
        payload.resolve(j.dump());
    }

    void EngineService::PostHierarchy(WebViewPayload &payload, Engine &engine) {
        WorldService *world = engine.getWorldService();
        std::unordered_map<uint32_t, std::vector<uint32_t>> hierarchy = world->getParentChildren();
        nlohmann::json json;
        GetHierarchy(json, world, hierarchy, &world->getRoot());
        payload.webview->postMessage(json.dump(), GET_HIERARCHY);
    }

    void EngineService::GetHierarchy(nlohmann::json &json,
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