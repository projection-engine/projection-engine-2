#ifndef PROJECTION_WEBVIEWWINDOW_H
#define PROJECTION_WEBVIEWWINDOW_H

#include "WebView2.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include <wrl.h>
#include <string>
#include "../../../util/debug/ILoggable.h"
#include <wil/com.h>
#include <vector>

#define CONTROLLER_HANDLER ICoreWebView2CreateCoreWebView2ControllerCompletedHandler
#define ENV_HANDLER ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler
#define MSG_RECEIVED_ARGS ICoreWebView2WebMessageReceivedEventArgs
#define MSG_RECEIVED_HANDLER ICoreWebView2WebMessageReceivedEventHandler

namespace PEngine {
    class AbstractWindow;

    class WebViewPayload;

    struct ListenerDTO {
        void (*action)(WebViewPayload &);
    };

    class WebViewWindow : public ILoggable {
    private:
        std::string id;
        std::string pathToFile;
        wil::com_ptr<ICoreWebView2Controller> webviewController = nullptr;
        wil::com_ptr<ICoreWebView2> webview = nullptr;
        AbstractWindow *window = nullptr;
        std::unordered_map<std::string, ListenerDTO *> listeners;
        std::function<void(WebViewWindow *webView)> callback = nullptr;

        void configureWebView();

        void configureMessageListener();

        void configureHTML();

    public:

        explicit WebViewWindow(
                const std::string &id,
                AbstractWindow *window,
                const std::string &path,
                std::function<void(WebViewWindow *webView)> callback
        );

        void addMessageListener(const std::string &listenerId, void (*action)(WebViewPayload &));

        HRESULT onMessage(ICoreWebView2WebMessageReceivedEventArgs *args);

        wil::com_ptr<ICoreWebView2> getWebView();

        void postMessage(const std::string &message, const std::string &id);

        void init();

        void setBounds(RECT bounds);

        const std::string &getId();
    };

}

#endif
