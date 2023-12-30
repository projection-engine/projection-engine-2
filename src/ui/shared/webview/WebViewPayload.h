#ifndef PROJECTION_WEBVIEWPAYLOAD_H
#define PROJECTION_WEBVIEWPAYLOAD_H

#include <string>

namespace PEngine {
    class IWindow;

    class WebViewWindow;

    struct WebViewPayload {
        std::string id;
        const char *payload = nullptr;
        IWindow *window = nullptr;
        WebViewWindow *webview = nullptr;

        void resolve(const char *message) const;
    };
}
#endif
