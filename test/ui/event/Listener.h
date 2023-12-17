#ifndef PROJECTION_LISTENER_H
#define PROJECTION_LISTENER_H


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
