#include "AbstractWindow.h"
#include "basic/Runner.h"
#include "wtypes.h"
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"

namespace PEngine {
    void AbstractWindow::addWebView(const std::string &id, const std::string &filePath) {
        webViews[id] = new WebViewWindow(filePath, this);
    }

    void AbstractWindow::addWebViewEventListener( const std::string &listenerId,
                                                 void (*action)(WebViewPayload &)) {
        webView->addMessageListener(listenerId, action);
    }

    void AbstractWindow::postWebViewMessage( const std::string &listenerId, const std::string& message) {
        webView->postMessage(message, listenerId);
    }

    AbstractWindow::AbstractWindow(const std::string &name) {
        this->name = name;
    }

    GLFWwindow *AbstractWindow::getWindow() const {
        return window;
    }

    void AbstractWindow::setWindowRepository(WindowRepository *wr) {
        this->windowRepository = wr;
    }

    WindowRepository *AbstractWindow::getWindowRepository() const {
        return windowRepository;
    }

    void AbstractWindow::setWindow(GLFWwindow *window) {
        AbstractWindow::window = window;
    }

    const std::string &AbstractWindow::getName() const {
        return name;
    }
}