#include "ListenerWrapper.h"
#include "IListener.h"
#include "IEventPayload.h"

namespace PEngine {

    void ListenerWrapper::addListener(IListener *listener) {
        listeners.push(listener);
    }

    void ListenerWrapper::removeListener(IListener *listener) {
        listeners.remove(listener);
    }

    size_t ListenerWrapper::listenersSize() {
        return listeners.getLength();
    }

    void ListenerWrapper::callListeners(PEngine::IEventPayload *pPayload) {
        listeners.iterate();
        while (listeners.hasNext()) {
            IListener *pListener = listeners.next();
            pListener->onEvent(pPayload);
        }
    }
}