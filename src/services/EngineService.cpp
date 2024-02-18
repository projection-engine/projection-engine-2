#include "EngineService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "../ui/editor/Editor.h"
#include "../engine/services/world/Entity.h"
#include "nlohmann/json.hpp"
#include "../engine/enum/EngineEvents.h"
#include "../engine/listeners/WorldHierarchyListener.h"
#include "../engine/listeners/WorldChangeListener.h"

namespace PEngine {
    void EngineService::BindEvents(PEngine::WebViewWindow &pWindow) {
        pWindow.addMessageListener(EngineEvents::CREATE_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::DELETE_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_HIERARCHY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::SELECT_ENTITIES, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_SELECTED_ENTITIES, HandleEvent);
        pWindow.addMessageListener(EngineEvents::LOCK_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_LOCKED_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::MAKE_PARENT, HandleEvent);
        pWindow.addMessageListener(EngineEvents::RENAME_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::TOGGLE_ACTIVE, HandleEvent);

        pWindow.addMessageListener(EngineEvents::UPDATE_ENGINE_STATE, HandleEvent);
        pWindow.addMessageListener(EngineEvents::UPDATE_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::UPDATE_COMPONENT, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_ENTITY_COMPONENTS, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_ENTITY, HandleEvent);
        pWindow.addMessageListener(EngineEvents::ADD_COMPONENT, HandleEvent);
        pWindow.addMessageListener(EngineEvents::GET_ENGINE_STATE, HandleEvent);
    }

    void EngineService::HandleEvent(WebViewPayload &payload) {
        Engine &engine = ((Editor &) payload.window).getEngine();
        WorldService *world = engine.getWorldService();

        if (payload.id == EngineEvents::CREATE_ENTITY) {
            WorldChangeListener::AddEntity(payload, engine, world);
        } else if (payload.id == EngineEvents::DELETE_ENTITY) {
            WorldChangeListener::DeleteEntity(payload, engine, world);
        } else if (payload.id == EngineEvents::GET_HIERARCHY) {
            WorldHierarchyListener::PostHierarchy(payload, engine);
        } else if (payload.id == EngineEvents::TOGGLE_ACTIVE) {
            WorldChangeListener::ToggleActive(payload, engine, world);
        } else if (payload.id == EngineEvents::SELECT_ENTITIES) {
            WorldHierarchyListener::SelectEntities(payload, engine);
        } else if (payload.id == EngineEvents::GET_SELECTED_ENTITIES) {
            WorldHierarchyListener::PostSelectedEntities(payload, engine);
        } else if (payload.id == EngineEvents::LOCK_ENTITY) {
            WorldHierarchyListener::LockEntity(payload, engine);
        } else if (payload.id == EngineEvents::GET_LOCKED_ENTITY) {
            WorldHierarchyListener::PostLockedEntity(payload, engine);
        } else if (payload.id == EngineEvents::RENAME_ENTITY) {
            WorldChangeListener::RenameEntity(payload, engine, world);
        } else if (payload.id == EngineEvents::UPDATE_ENGINE_STATE) {
            UpdateEngineState(payload, engine);
        } else if (payload.id == EngineEvents::UPDATE_ENTITY) {
            WorldChangeListener::UpdateEntity(payload, world);
        } else if (payload.id == EngineEvents::UPDATE_COMPONENT) {
            WorldChangeListener::UpdateComponent(payload, world);
        } else if (payload.id == EngineEvents::GET_ENTITY_COMPONENTS) {
            WorldChangeListener::GetEntityComponents(payload, world);
        } else if (payload.id == EngineEvents::GET_ENTITY) {
            WorldChangeListener::GetEntity(payload, world);
        } else if (payload.id == EngineEvents::ADD_COMPONENT) {
            WorldChangeListener::AddComponent(payload, engine, world);
        } else if (payload.id == EngineEvents::GET_ENGINE_STATE) {
            GetEngineState(payload, engine);
        }
    }

    void EngineService::UpdateEngineState(WebViewPayload &payload, Engine &engine) {
        nlohmann::json parsed = nlohmann::json::parse(payload.payload);
        RuntimeState &state = engine.getState();
        state.parse(parsed);

        GetEngineState(payload, engine);
    }

    void EngineService::GetEngineState(WebViewPayload &payload, Engine &engine) {
        payload.webview->postMessage(engine.getState().serialize().dump(), EngineEvents::GET_ENGINE_STATE);
    }

}
