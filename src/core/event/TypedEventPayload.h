#ifndef PROJECTION_TYPEDEVENTPAYLOAD_H
#define PROJECTION_TYPEDEVENTPAYLOAD_H

#include "IEventPayload.h"

namespace PEngine {

    template<typename T>
    class TypedEventPayload : public IEventPayload {
    private:
        T message;
    public:

        T getMessage() {
            return message;
        }

        explicit TypedEventPayload(const char *evT, IEventTarget *target, T m) : IEventPayload(evT, target) {
            message = m;
        }

        explicit TypedEventPayload(const char *evT, T m) : IEventPayload(evT) {
            message = m;
        }
    };
}

#endif
