#ifndef CATALYST_ILISTENER_H
#define CATALYST_ILISTENER_H

#include <string>
#include "../../core/debug/ILoggable.h"
#include "IEventTarget.h"

namespace PEngine {
    class IEventPayload;

    class IListener : public ILoggable, public IEventTarget {
    public:
        virtual void onEvent(IEventPayload *payload);
    };

}

#endif
