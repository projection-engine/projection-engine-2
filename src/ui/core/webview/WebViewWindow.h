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

namespace PEngine {

    class WebViewWindow : public ILoggable{
    private:
        std::string pathToFile;
        HWND nativeWindow;
        HRESULT result;
        EventRegistrationToken token;
        wil::com_ptr<ICoreWebView2Controller> webviewController = nullptr;
        wil::com_ptr<ICoreWebView2> webview = nullptr;
        void (*onInitialized)(WebViewWindow* ref);

        void initialSetup(ICoreWebView2Controller *controller);

    public:
        explicit WebViewWindow(void (*onInit)(WebViewWindow* ref));

        void initialize(GLFWwindow *window);

        HWND__ *getNativeWindow() const;

        void addOnMessageListener(void (*action)(ICoreWebView2 *, ICoreWebView2WebMessageReceivedEventArgs *));

        void postMessage(std::string message);

        void setHTML(const std::string &htmlFileName);
    };

}

#endif
