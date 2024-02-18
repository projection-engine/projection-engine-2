#include "WebViewWindow.h"
#include <filesystem>
#include "../AbstractWindow.h"

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include <nlohmann/json.hpp>
#include <utility>
#include "GLFW/glfw3native.h"
#include "WebViewPayload.h"
#include "WebView2EnvironmentOptions.h"

namespace PEngine {
    void WebViewWindow::prepareView(ICoreWebView2Controller *controller) {
        webviewController = controller;
        webviewController->get_CoreWebView2(
                &webview);

        wil::com_ptr<ICoreWebView2Controller2> controller2 = webviewController.try_query<ICoreWebView2Controller2>();
        if (controller2) {
            COREWEBVIEW2_COLOR transparentColor = {0, 255, 255, 255};
            controller2->put_DefaultBackgroundColor(transparentColor);
        }
        wil::com_ptr<ICoreWebView2Settings> settings;
        webview->get_Settings(
                &settings);
        settings->put_IsScriptEnabled(
                TRUE);
        settings->put_AreDefaultScriptDialogsEnabled(
                TRUE);
        settings->put_IsWebMessageEnabled(
                TRUE);

        resize();
        EventRegistrationToken token;
        webview->add_WebMessageReceived(
                Microsoft::WRL::Callback<MSG_RECEIVED_HANDLER>(
                        [this](ICoreWebView2 *wv, MSG_RECEIVED_ARGS *args) -> HRESULT {
                            return onMessage(args);
                        }).Get(),
                &token);


        if (!pathToFile.empty()) {
            callback(this);
            std::wstring pathToFileW = std::wstring(pathToFile.begin(), pathToFile.end());
            CONSOLE_WARN("Navigating to: {0}", pathToFile)
            webview->Navigate(pathToFileW.c_str());
        }
    }

    HRESULT WebViewWindow::onMessage(ICoreWebView2WebMessageReceivedEventArgs *args) {
        wil::unique_cotaskmem_string message;
        args->TryGetWebMessageAsString(&message);
        std::wstring msg(message.get());

        try {
            nlohmann::json payloadJson = nlohmann::json::parse(msg);
            WebViewPayload payload{
                    payloadJson.at("id").get<std::string>(),
                    window,
                    this
            };
            CONSOLE_LOG("WebView message received with ID: {0}", payload.id)
            if (payloadJson.find("payload") != payloadJson.end()) {
                payload.payload = payloadJson.at("payload").get<std::string>();
            }
            CONSOLE_LOG("Content: {0}", payload.payload)
            if (listeners.count(payload.id)) {
                listeners[payload.id]->action(payload);
            }
        } catch (nlohmann::json::parse_error &ex) {
            CONSOLE_ERROR("Error parsing payload")
        }

        return S_OK;
    }

    void WebViewWindow::postMessage(const std::string &message, const std::string &id) {
        nlohmann::json jsonObj;
        jsonObj["payload"] = message.c_str();
        jsonObj["id"] = id.c_str();
        std::string messagePayload = jsonObj.dump();
        CONSOLE_WARN("Posting message to {0}", id)
        webview->PostWebMessageAsString(std::wstring(messagePayload.begin(), messagePayload.end()).c_str());
    }

    WebViewWindow::WebViewWindow(AbstractWindow *window, const std::string &path, std::function<void(WebViewWindow *webView)> callback) {
        pathToFile = "file:///" + std::filesystem::current_path().string() + "/" + path;
        this->callback = std::move(callback);
        this->window = window;
    }

    void WebViewWindow::init() {
        CONSOLE_WARN("Creating WebView2 window")
        const auto &evCallback = Microsoft::WRL::Callback<ENV_HANDLER>(
                [this](HRESULT r, ICoreWebView2Environment *env) -> HRESULT {
                    env->CreateCoreWebView2Controller(
                            window->getNativeWindow(),
                            Microsoft::WRL::Callback<CONTROLLER_HANDLER>(
                                    [this](HRESULT r, ICoreWebView2Controller *controller) -> HRESULT {
                                        prepareView(controller);
                                        return S_OK;
                                    }).Get()
                    );
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
                evCallback.Get()
        );
    }

    void WebViewWindow::addMessageListener(const std::string &listenerId, void (*action)(WebViewPayload &)) {
        listeners[listenerId] = new ListenerDTO(action);
    }

    wil::com_ptr<ICoreWebView2> WebViewWindow::getWebView() {
        return webview;
    }

    void WebViewWindow::resize() {
        if (webviewController != nullptr) {
            RECT bounds;
            GetClientRect(window->getNativeWindow(), &bounds);
            webviewController->put_Bounds(bounds);
        }
    }

}
