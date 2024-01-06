#ifndef PROJECTION_WEBVIEWPAYLOAD_H
#define PROJECTION_WEBVIEWPAYLOAD_H

#include <string>

namespace PEngine {
    class AbstractWindow;

    class WebViewWindow;

    struct WebViewPayload {
        std::string id;
        std::string payload;
        WebViewWindow *webview = nullptr;

        void resolve(const std::string& message) const;
    };
}
#endif
