#include "HierarchyService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "../ui/editor/Editor.h"
#include "../ui/WindowRepository.h"
#include "nlohmann/json.hpp"

#define CREATE_ENTITY "CREATE_ENTITY"
#define DELETE_ENTITY "DELETE_ENTITY"
#define GET_HIERARCHY "GET_HIERARCHY"
#define SELECT_ENTITIES "SELECT_ENTITIES"
#define GET_SELECTED_ENTITIES "GET_SELECTED_ENTITIES"
#define LOCK_ENTITY "LOCK_ENTITY"
#define GET_LOCKED_ENTITY "GET_LOCKED_ENTITY"

namespace PEngine {
    void HierarchyService::BindEvents(PEngine::WebViewWindow *pWindow) {
        pWindow->addMessageListener(CREATE_ENTITY, HandleEvent);
        pWindow->addMessageListener(DELETE_ENTITY, HandleEvent);
        pWindow->addMessageListener(GET_HIERARCHY, HandleEvent);
        pWindow->addMessageListener(SELECT_ENTITIES, HandleEvent);
        pWindow->addMessageListener(GET_SELECTED_ENTITIES, HandleEvent);
        pWindow->addMessageListener(LOCK_ENTITY, HandleEvent);
        pWindow->addMessageListener(GET_LOCKED_ENTITY, HandleEvent);
    }

    void HierarchyService::HandleEvent(WebViewPayload &payload) {
        Editor *window = (Editor *) WindowRepository::Get().getWindowById(EDITOR_WINDOW);
        Engine &engine = window->getEngine();

        if (payload.id == CREATE_ENTITY) {
            engine.getWorldService()->addEntity();
        } else if (payload.id == DELETE_ENTITY) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            std::uint32_t value = parsed.at("id").get<std::uint32_t>();
            engine.getWorldService()->removeEntity(value);
        } else if (payload.id == GET_HIERARCHY) {
            // TODO
        } else if (payload.id == SELECT_ENTITIES) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);

            std::vector<std::uint32_t> &vec = engine.getState().selected;
            vec.clear();
            for (auto &element: parsed) {
                vec.push_back(element);
            }
        } else if (payload.id == GET_SELECTED_ENTITIES) {
            nlohmann::json result = engine.getState().selected;
            payload.resolve(result.dump());
        } else if (payload.id == LOCK_ENTITY) {
            nlohmann::json parsed = nlohmann::json::parse(payload.payload);
            engine.getState().lockedEntity = parsed.at("id").get<std::uint32_t>();
        } else if (payload.id == GET_LOCKED_ENTITY) {
            nlohmann::json j;
            j["id"] = engine.getState().lockedEntity;
            payload.resolve(j.dump());
        }
    }
} 