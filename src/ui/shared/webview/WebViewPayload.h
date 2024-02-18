#ifndef PROJECTION_WEBVIEWPAYLOAD_H
#define PROJECTION_WEBVIEWPAYLOAD_H

#include <string>

namespace PEngine {
    class AbstractWindow;

    class WebViewWindow;

    struct WebViewPayload {
        std::string id;
        AbstractWindow &window;
        WebViewWindow *webview = nullptr;
        std::string payload{};

        void resolve(const std::string &message) const;
    };
}
#endif
