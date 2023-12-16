#ifndef CATALYST_LISTENERWRAPPER_H
#define CATALYST_LISTENERWRAPPER_H

#include <string>
#include "IListener.h"
#include "../../core/structures/List.h"
#include "../../core/debug/ILoggable.h"

namespace PEngine {
    class IEventPayload;

    class ListenerWrapper : public ILoggable{
    private:
        List<IListener> listeners;
    public:

        void addListener(IListener *listener);

        void removeListener(IListener *listener);

        size_t listenersSize();

        void callListeners(PEngine::IEventPayload *pPayload);
    };

}

#endif
