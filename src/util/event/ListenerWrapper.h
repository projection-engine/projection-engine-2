#ifndef PROJECTION_LISTENERWRAPPER_H
#define PROJECTION_LISTENERWRAPPER_H

#include <string>
#include "IListener.h"
#include "../../util/structures/List.h"
#include "../../util/debug/ILoggable.h"

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
