#include "IWindow.h"
#include "basic/Runner.h"
#include "wtypes.h"
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"
#include "ImGuiContextUtil.h"

namespace PEngine {
    void IWindow::getDesktopResolution(int &horizontal, int &vertical) {
        RECT desktop;
        GetWindowRect(GetDesktopWindow(), &desktop);
        horizontal = desktop.right;
        vertical = desktop.bottom;
    }

    void IWindow::removeWebView(const std::string &id) {
        if (webViews.contains(id)) {
            webViews.erase(id);
        }
    }

    void IWindow::addWebView(const std::string &id, const std::string &filePath) {
        webViews[id] = new WebViewWindow(filePath, this);
    }

    void IWindow::addWebViewEventListener(const std::string &webviewId, const std::string &listenerId,
                                          void (*action)(WebViewPayload &)) {
        webViews[webviewId]->addMessageListener(listenerId, action);
    }

    void IWindow::postWebViewMessage(const std::string &webviewId, const std::string &listenerId, const std::string& message) {
        webViews[webviewId]->postMessage(message, listenerId);
    }

    void IWindow::setWindowResizable(bool isResizable) {
        glfwWindowHint(GLFW_RESIZABLE, isResizable ? GLFW_TRUE : GLFW_FALSE);
    }

    IWindow::IWindow(const std::string &name) {
        this->name = name;
    }

    IWindow::~IWindow() {
        for (const std::pair<const std::basic_string<char>, WebViewWindow *>& entry: webViews) {
            delete entry.second;
        }
    }

    GLFWwindow *IWindow::getWindow() const {
        return window;
    }

    void IWindow::setWindowRepository(WindowRepository *wr) {
        this->windowRepository = wr;
    }

    IRunner *IWindow::initialize() {
        CONSOLE_LOG("Creating window")
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            CONSOLE_ERROR("Error initializing glfw")
            return nullptr;
        }
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
//        glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);

        int width;
        int height;
        getDesktopResolution(width, height);
        window = glfwCreateWindow(width * scaleX, height * scaleY, name.c_str(), nullptr, nullptr);
        if (window == nullptr) {
            CONSOLE_ERROR("Error creating window")
            return nullptr;

        }

        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        CONSOLE_LOG("WINDOW CREATED")
        return nullptr;
    }

    WindowRepository *IWindow::getWindowRepository() const {
        return windowRepository;
    }
}