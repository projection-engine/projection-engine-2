#include "WebViewWindow.h"
#include <filesystem>
#include <iostream>

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include "GLFW/glfw3native.h"

namespace PEngine {
    HWND__ *WebViewWindow::getNativeWindow() const {
        return nativeWindow;
    }

    void WebViewWindow::prepareView(ICoreWebView2Controller *controller) {
        CONSOLE_WARN("Initializing WebView2 context")
        webviewController = controller;
        webviewController->get_CoreWebView2(
                &webview);

        wil::com_ptr<ICoreWebView2Settings> settings;
        webview->get_Settings(
                &settings);
        settings->put_IsScriptEnabled(
                TRUE);
        settings->put_AreDefaultScriptDialogsEnabled(
                TRUE);
        settings->put_IsWebMessageEnabled(
                TRUE);

        RECT bounds;
        GetClientRect(nativeWindow, &bounds);

        bounds.left = bounds.left / 2;
        webviewController->put_Bounds(bounds);
        std::wstring pathToFileW = std::wstring(pathToFile.begin(), pathToFile.end());
        CONSOLE_WARN("Navigating to: {0}", pathToFile)
        webview->Navigate(pathToFileW.c_str());
        CONSOLE_LOG("WebView2 context successfully initialized")
    }


    void WebViewWindow::postMessage(std::string message) {
        if (webview == nullptr) {
            CONSOLE_ERROR("WebView not initialized")
            return;
        }
        CONSOLE_WARN("Posting message")
        webview->PostWebMessageAsString(std::wstring(message.begin(), message.end()).c_str());
    }

    WebViewWindow::WebViewWindow(const std::string &pathToFile, GLFWwindow *window) {
        this->pathToFile = "file:///" + std::filesystem::current_path().string() + "/" + pathToFile;
        CONSOLE_WARN("Creating WebView2 window")
        nativeWindow = glfwGetWin32Window(window);
        result = CreateCoreWebView2EnvironmentWithOptions(
                nullptr,
                nullptr,
                nullptr,
                Microsoft::WRL::Callback<ENV_HANDLER>(
                        [this](HRESULT r, ICoreWebView2Environment *env) -> HRESULT {
                            const Microsoft::WRL::ComPtr<CONTROLLER_HANDLER> &handler = Microsoft::WRL::Callback<CONTROLLER_HANDLER>(
                                    [this](HRESULT r, ICoreWebView2Controller *controller) -> HRESULT {
                                        prepareView(controller);
                                        return S_OK;
                                    });
                            env->CreateCoreWebView2Controller(getNativeWindow(), handler.Get());
                            return S_OK;
                        }).Get());
    }

    void WebViewWindow::addOnMessageListener(
            void (*action)(BASE *, MSG_RECEIVED_ARGS *,
                           IWindow *), IWindow *window) {
        if (webview == nullptr) {
            CONSOLE_ERROR("WebView not initialized")
            return;
        }
        const Microsoft::WRL::ComPtr<MSG_RECEIVED_HANDLER> &messageHandler = Microsoft::WRL::Callback<MSG_RECEIVED_HANDLER>(
                [&action, window](ICoreWebView2 *wv, MSG_RECEIVED_ARGS *args) -> HRESULT {
                    action(wv, args, window);
                    return S_OK;
                });
        webview->add_WebMessageReceived(messageHandler.Get(), &token);
    }

}