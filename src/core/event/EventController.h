#ifndef PROJECTION_EVENTCONTROLLER_H
#define PROJECTION_EVENTCONTROLLER_H

#include <string>
#include "IEventTarget.h"
#include "../../core/debug/ILoggable.h"

namespace PEngine {
    class IListener;

    class ListenerWrapper;

    class IEventPayload;

    template<typename K, typename V>
    class Map;

    class EventController : public ILoggable {
    private:
        static EventController *instance;

        static Map<std::string, ListenerWrapper *> wrappers;

        static ListenerWrapper *getWrapper(const std::string &eventType, bool createIfNotPresent);

        explicit EventController();

    public:
        static EventController *get();

        void addListener(std::string eventType, IListener *listener);

        void removeListener(std::string eventType, IListener *listener);

        void triggerEvent(IEventPayload &payload);

        void triggerEvent(const std::string& eventType);

        void triggerEvent(const std::string& eventType, IEventTarget *target);
    };

}

#endif
