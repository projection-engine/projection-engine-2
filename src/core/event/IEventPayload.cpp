#include "IEventPayload.h"

#include <utility>

namespace PEngine {

    IEventPayload::IEventPayload(std::string type, IEventTarget *t) {
        eventType = std::move(type);
        target = t;
    }

    const std::string &IEventPayload::getEventType() const {
        return eventType;
    }

    IEventTarget *IEventPayload::getTarget() const {
        return target;
    }

    IEventPayload::IEventPayload(std::string type) {
        eventType = std::move(type);
    }
}