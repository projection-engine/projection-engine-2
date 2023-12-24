#include "WebViewWindow.h"
#include <filesystem>
#include <iostream>
#include "../IWindow.h"

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include <nlohmann/json.hpp>
#include "GLFW/glfw3native.h"
#include "WebViewPayload.h"

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
        webview->add_WebMessageReceived(
                Microsoft::WRL::Callback<MSG_RECEIVED_HANDLER>(
                        [this](ICoreWebView2 *wv, MSG_RECEIVED_ARGS *args) -> HRESULT {
                            return onMessage(args);
                        }).Get(),
                &token);
    }

    HRESULT WebViewWindow::onMessage(ICoreWebView2WebMessageReceivedEventArgs *args) {
        wil::unique_cotaskmem_string message;
        args->TryGetWebMessageAsString(&message);
        std::wstring msg(message.get());

        WebViewPayload payload;
        try {
            nlohmann::json payloadJson = nlohmann::json::parse(msg);
            payload.id = payloadJson["id"].get<std::string>();
            CONSOLE_LOG("WebView message received with ID: {0}", payload.id)
            if (payloadJson["payload"].is_string()) {
                payload.payload = payloadJson["payload"].get<std::string>().c_str();
            }
            payload.webview = webview;
            payload.window = window;
        } catch (nlohmann::json::parse_error &ex) {
            CONSOLE_ERROR("Error parsing payload")
        }
        if (listeners.count(payload.id)) {
            listeners[payload.id]->action(payload);
        }
        return S_OK;
    }

    void WebViewWindow::postMessage(std::string message) {
        if (webview == nullptr) {
            CONSOLE_ERROR("WebView not initialized")
            return;
        }
        CONSOLE_WARN("Posting message")
        webview->PostWebMessageAsString(std::wstring(message.begin(), message.end()).c_str());
    }

    WebViewWindow::WebViewWindow(const std::string &pathToFile, IWindow *window) {
        this->window = window;
        this->pathToFile = "file:///" + std::filesystem::current_path().string() + "/" + pathToFile;
        CONSOLE_WARN("Creating WebView2 window")
        nativeWindow = glfwGetWin32Window(this->window->getWindow());
        CreateCoreWebView2EnvironmentWithOptions(
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

    void WebViewWindow::addMessageListener(const std::string &listenerId, void (*action)(WebViewPayload &)) {
        listeners[listenerId] = new ListenerDTO(action);
    }
}