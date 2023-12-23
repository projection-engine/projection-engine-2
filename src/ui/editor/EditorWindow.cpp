#include <filesystem>
#include <iostream>
#include "EditorWindow.h"
#include "runner/Runner.h"
#include "../core/webview/WebViewWindow.h"
#include "WebView2.h"

namespace PEngine {
    void EditorWindow::initialize() {
        IWindow::initialize();
        document.setEngine(&engine);
        const char *string = "TEST";
        addWebView(string, "project-window.html");
        addWebViewEventListener(string, onMessage);
    }

    IRunner *EditorWindow::createRunner() {
        return new Runner(window, document);
    }

    void
    EditorWindow::onMessage(ICoreWebView2 *webView, ICoreWebView2WebMessageReceivedEventArgs *args, IWindow *window) {
        wil::unique_cotaskmem_string message;
        args->TryGetWebMessageAsString(&message);
        std::wstring msg(message.get());
        if (msg == L"RELOAD") {
            webView->Reload();
        }
    }
}
