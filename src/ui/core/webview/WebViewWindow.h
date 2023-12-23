#ifndef PROJECTION_WEBVIEWWINDOW_H
#define PROJECTION_WEBVIEWWINDOW_H

#include "WebView2.h"
#include "GLFW/glfw3.h"
#include <wrl.h>
#include "string"
#include "../../../core/debug/ILoggable.h"
#include <wil/com.h>

#define CONTROLLER_HANDLER ICoreWebView2CreateCoreWebView2ControllerCompletedHandler
#define ENV_HANDLER ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler
#define MSG_RECEIVED_ARGS ICoreWebView2WebMessageReceivedEventArgs
#define MSG_RECEIVED_HANDLER ICoreWebView2WebMessageReceivedEventHandler
#define BASE ICoreWebView2

namespace PEngine {
    class IWindow;

    class WebViewWindow : public ILoggable {
    private:
        std::string pathToFile;
        HWND nativeWindow;
        EventRegistrationToken token;
        wil::com_ptr<ICoreWebView2Controller> webviewController = nullptr;
        wil::com_ptr<ICoreWebView2> webview = nullptr;
        HRESULT result;

        void prepareView(ICoreWebView2Controller *controller);

    public:
        explicit WebViewWindow(const std::string &pathToFile, GLFWwindow *window);

        HWND__ *getNativeWindow() const;

        void
        addOnMessageListener(void (*action)(BASE *webView, MSG_RECEIVED_ARGS *args, IWindow *window), IWindow *window);

        void postMessage(std::string message);
    };

}

#endif
