#ifndef PROJECTION_WEBVIEWWINDOW_H
#define PROJECTION_WEBVIEWWINDOW_H

#include "WebView2.h"
#include "GLFW/glfw3.h"
#include <wrl.h>
#include "string"
#include "../../../util/debug/ILoggable.h"
#include <wil/com.h>
#include <vector>

#define CONTROLLER_HANDLER ICoreWebView2CreateCoreWebView2ControllerCompletedHandler
#define ENV_HANDLER ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler
#define MSG_RECEIVED_ARGS ICoreWebView2WebMessageReceivedEventArgs
#define MSG_RECEIVED_HANDLER ICoreWebView2WebMessageReceivedEventHandler
#define BASE ICoreWebView2

namespace PEngine {
    class IWindow;

    class WebViewPayload;

    struct ListenerDTO {
        void (*action)(WebViewPayload &);
    };

    class WebViewWindow : public ILoggable {
    private:
        std::string pathToFile;
        HWND nativeWindow;
        EventRegistrationToken token;
        wil::com_ptr<ICoreWebView2Controller> webviewController = nullptr;
        wil::com_ptr<ICoreWebView2> webview = nullptr;
        IWindow *window;
        std::unordered_map<std::string, ListenerDTO *> listeners;

        void prepareView(ICoreWebView2Controller *controller);

    public:

        explicit WebViewWindow(const std::string &pathToFile, IWindow *window);

        HWND__ *getNativeWindow() const;

        void addMessageListener(const std::string &listenerId, void (*action)(WebViewPayload &));

        HRESULT onMessage(ICoreWebView2WebMessageReceivedEventArgs *args);

        wil::com_ptr<ICoreWebView2> getWebView();

        void postMessage(const std::string& message, const std::string& id);
    };

}

#endif
