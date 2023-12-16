
#ifndef CATALYST_IEVENTPAYLOAD_H
#define CATALYST_IEVENTPAYLOAD_H

#include <string>

namespace PEngine {
    class IEventTarget;

    class IEventPayload {
    private:
        std::string eventType;
        IEventTarget *target = nullptr;
    public:
        explicit IEventPayload(std::string type, IEventTarget *target);

        explicit IEventPayload(std::string type);

        const std::string &getEventType() const;

        IEventTarget *getTarget() const;
    };
}

#endif
