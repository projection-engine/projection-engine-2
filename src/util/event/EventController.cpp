#include "EventController.h"
#include "../../util/structures/Map.cpp"
#include "ListenerWrapper.h"
#include "IEventPayload.h"

namespace PEngine {
    EventController *EventController::instance;
    Map<std::string, ListenerWrapper *> EventController::wrappers;

    void EventController::removeListener(std::string eventType, IListener *listener) {
        CONSOLE_WARN("Removing listener for {0}", eventType)
        ListenerWrapper *pWrapper = getWrapper(eventType, false);
        if (pWrapper == nullptr) return;
        pWrapper->removeListener(listener);

        if (pWrapper->listenersSize() == 0) {
            CONSOLE_WARN("Cleaning-up event type {0}", eventType)
            wrappers.deleteKey(eventType);
            delete pWrapper;
        }
    }

    void EventController::addListener(std::string eventType, IListener *listener) {
        ListenerWrapper *pWrapper = getWrapper(eventType, true);
        CONSOLE_WARN("Adding listener for {0}", eventType)
        pWrapper->addListener(listener);
    }

    ListenerWrapper *EventController::getWrapper(const std::string &eventType, bool createIfNotPresent) {
        ListenerWrapper *pWrapper = nullptr;
        if (wrappers.has(eventType)) {
            pWrapper = wrappers.get(eventType);
        } else if (createIfNotPresent) {
            pWrapper = new ListenerWrapper;
            wrappers.set(eventType, pWrapper);
        }
        return pWrapper;
    }

    void EventController::triggerEvent(IEventPayload &payload) {
        ListenerWrapper *pWrapper = getWrapper(payload.getEventType(), false);
        if (pWrapper == nullptr) {
            CONSOLE_WARN("Event type {0} was not found", payload.getEventType())
            return;
        }
        CONSOLE_WARN("Triggering {0}", payload.getEventType())
        pWrapper->callListeners(&payload);
    }

    void EventController::triggerEvent(const std::string& eventType) {
        IEventPayload pPayload(eventType);
        triggerEvent(pPayload);
    }

    void EventController::triggerEvent(const std::string& eventType, IEventTarget *target) {
        IEventPayload pPayload(eventType, target);
        triggerEvent(pPayload);
    }

    EventController::EventController() = default;

    EventController *EventController::get() {
        if (instance == nullptr) {
            instance = new EventController;
        }
        return instance;
    }
}