#ifndef CATALYST_LISTENER_H
#define CATALYST_LISTENER_H


#include "../../../src/core/event/IListener.h"

namespace PEngine {

    class Listener : public IListener {
    private:
        void onEvent(IEventPayload *payload) override;
    public:
        bool called = false;
        IEventPayload *event = nullptr;
    };
}

#endif
