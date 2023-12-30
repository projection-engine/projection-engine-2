
#include "WebViewPayload.h"
#include "WebViewWindow.h"

namespace PEngine {
    void WebViewPayload::resolve(const char *message) const {
        webview->postMessage(message, id);
    }
}
