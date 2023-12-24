#ifndef PROJECTION_WEBVIEWPAYLOAD_H
#define PROJECTION_WEBVIEWPAYLOAD_H

#include <string>

namespace PEngine {
    class IWindow;

    struct WebViewPayload {
        std::string id;
        const char *payload = nullptr;
        IWindow *window = nullptr;
        wil::com_ptr<ICoreWebView2> webview = nullptr;
    };
}
#endif
