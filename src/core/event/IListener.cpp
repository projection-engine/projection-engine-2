#include "IListener.h"
#include "IEventPayload.h"

namespace PEngine {
    void IListener::onEvent(IEventPayload *event) {
        CONSOLE_WARN("Default event listener triggered for {0}", event->getEventType())
    }
}