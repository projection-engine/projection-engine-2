#include "Listener.h"

namespace PEngine {
    void Listener::onEvent(PEngine::IEventPayload *payload) {
        called = true;
        event = payload;
    }
}