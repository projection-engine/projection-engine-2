#include "WebViewWindow.h"
#include <filesystem>
#include <iostream>
#include "../AbstractWindow.h"

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include <nlohmann/json.hpp>
#include "GLFW/glfw3native.h"
#include "WebViewPayload.h"
#include "../../../util/JSON.h"
#include <unordered_map>
#include "../WindowRepository.h"
#include "../../../util/FS.h"
#include "WebView2EnvironmentOptions.h"

namespace PEngine {
    HWND__ *WebViewWindow::getNativeWindow() const {
        return glfwGetWin32Window(WindowRepository::Get().getWindow());
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
        GetClientRect(getNativeWindow(), &bounds);

        bounds.left = bounds.left / 2;
        webviewController->put_Bounds(bounds);
        CONSOLE_LOG("WebView2 context successfully initialized")
        webview->add_WebMessageReceived(
                Microsoft::WRL::Callback<MSG_RECEIVED_HANDLER>(
                        [this](ICoreWebView2 *wv, MSG_RECEIVED_ARGS *args) -> HRESULT {
                            return onMessage(args);
                        }).Get(),
                &token);
        ready = true;
        loadHtml();
    }

    void WebViewWindow::setHTMLFile(const std::string &path) {
        pathToFile = "file:///" + std::filesystem::current_path().string() + "/" + path;
        if (ready) {
            loadHtml();
        }
    }

    void WebViewWindow::loadHtml() {
        if (!pathToFile.empty()) {
            std::wstring pathToFileW = std::wstring(pathToFile.begin(), pathToFile.end());
            CONSOLE_WARN("Navigating to: {0}", pathToFile)
            webview->Navigate(pathToFileW.c_str());
        }
    }

    HRESULT WebViewWindow::onMessage(ICoreWebView2WebMessageReceivedEventArgs *args) {
        wil::unique_cotaskmem_string message;
        args->TryGetWebMessageAsString(&message);
        std::wstring msg(message.get());

        WebViewPayload payload;
        try {
            JSON payloadJson = JSON::parse(msg);
            payload.id = payloadJson.get<std::string>("id", "");
            CONSOLE_LOG("WebView message received with ID: {0}", payload.id)
            payload.payload = payloadJson.get<std::string>("payload", "");
            payload.webview = this;
        } catch (nlohmann::json::parse_error &ex) {
            CONSOLE_ERROR("Error parsing payload")
        }
        if (listeners.count(payload.id)) {
            listeners[payload.id]->action(payload);
        }
        return S_OK;
    }

    void WebViewWindow::postMessage(const std::string &message, const std::string &id) {
        JSON jsonObj;
        jsonObj.set("payload", message.c_str());
        jsonObj.set("id", id.c_str());
        std::string messagePayload = jsonObj.stringify();
        CONSOLE_WARN("Posting message")
        webview->PostWebMessageAsString(std::wstring(messagePayload.begin(), messagePayload.end()).c_str());
    }

    WebViewWindow::WebViewWindow() {
        CONSOLE_WARN("Creating WebView2 window")
        const Microsoft::WRL::ComPtr<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler> &callback = Microsoft::WRL::Callback<ENV_HANDLER>(
                [this](HRESULT r, ICoreWebView2Environment *env) -> HRESULT {
                    const Microsoft::WRL::ComPtr<CONTROLLER_HANDLER> &handler = Microsoft::WRL::Callback<CONTROLLER_HANDLER>(
                            [this](HRESULT r, ICoreWebView2Controller *controller) -> HRESULT {
                                prepareView(controller);
                                return S_OK;
                            });
                    env->CreateCoreWebView2Controller(getNativeWindow(), handler.Get());
                    return S_OK;
                });

        auto options = Microsoft::WRL::Make<CoreWebView2EnvironmentOptions>();
        std::wstring args;
        args.append(L"--allow-file-access-from-files --disable-web-security");
        options->put_AdditionalBrowserArguments(args.c_str());
        CreateCoreWebView2EnvironmentWithOptions(
                nullptr,
                nullptr,
                options.Get(),
                callback.Get()
        );
    }

    void WebViewWindow::addMessageListener(const std::string &listenerId, void (*action)(WebViewPayload &)) {
        listeners[listenerId] = new ListenerDTO(action);
    }

    wil::com_ptr<ICoreWebView2> WebViewWindow::getWebView() {
        return webview;
    }

    void WebViewWindow::setWindow(AbstractWindow *window) {
        WebViewWindow::window = window;
    }

    void WebViewWindow::resize() {
        if(webviewController != nullptr) {
            RECT bounds;
            GetClientRect(getNativeWindow(), &bounds);
            webviewController->put_Bounds(bounds);
        }
    }

}