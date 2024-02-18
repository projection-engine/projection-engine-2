#ifndef PROJECTION_PROJECTSERVICE_H
#define PROJECTION_PROJECTSERVICE_H

#include "../ui/AbstractService.h"

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class ProjectService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        static void BindEvents(WebViewWindow *pWindow);

    };

}

#endif
