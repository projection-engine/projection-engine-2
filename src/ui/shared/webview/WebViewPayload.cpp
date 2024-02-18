
#include "WebViewPayload.h"
#include "WebViewWindow.h"

namespace PEngine {
    void WebViewPayload::resolve(const std::string& message) const {
        webview->postMessage(message, id);
    }

}
