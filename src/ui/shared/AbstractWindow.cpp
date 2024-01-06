#include "AbstractWindow.h"
#include "basic/Runner.h"
#include "wtypes.h"
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"

namespace PEngine {
    AbstractWindow::AbstractWindow(const std::string &name) {
        this->name = name;
    }

    std::string AbstractWindow::getName() {
        return name;
    }

    const char *AbstractWindow::getWebViewHTML() {
        return nullptr;
    }

    IRunner *AbstractWindow::initialize() {
        return nullptr;
    }
}