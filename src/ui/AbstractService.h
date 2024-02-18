#ifndef PROJECTION_ABSTRACTSERVICE_H
#define PROJECTION_ABSTRACTSERVICE_H

namespace PEngine {
    class WebViewWindow;

    struct AbstractService {
        virtual void bindEvents(WebViewWindow *webView) {}
    };
}

#endif
