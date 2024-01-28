#ifndef PROJECTION_ABSTRACTSERVICE_H
#define PROJECTION_ABSTRACTSERVICE_H

#include <vector>
#include <string>

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class AbstractService {
    public:
        virtual void BindEvents(WebViewWindow *pWindow) {}
    };

}

#endif
