#include "EditorWindow.h"
#include "runner/Runner.h"
#include "WebView2.h"
#include <wrl.h>
#include <wil/com.h>
#include "GLFW/glfw3.h"

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include "GLFW/glfw3native.h"

namespace PEngine {
    static wil::com_ptr<ICoreWebView2Controller> webviewController;
    static wil::com_ptr<ICoreWebView2> webview;

    void EditorWindow::onInitialize() {
        HWND hWnd = glfwGetWin32Window(this->window);
        CreateCoreWebView2EnvironmentWithOptions(nullptr, nullptr, nullptr,
                                                 Microsoft::WRL::Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
                                                         [hWnd](HRESULT result,
                                                                ICoreWebView2Environment *env) -> HRESULT {

                                                             // Create a CoreWebView2Controller and get the associated CoreWebView2 whose parent is the main window hWnd
                                                             env->CreateCoreWebView2Controller(hWnd,
                                                                                               Microsoft::WRL::Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                                                                                                       [hWnd](HRESULT result,
                                                                                                              ICoreWebView2Controller *controller) -> HRESULT {
                                                                                                           if (controller !=
                                                                                                               nullptr) {
                                                                                                               webviewController = controller;
                                                                                                               webviewController->get_CoreWebView2(
                                                                                                                       &webview);
                                                                                                           }

                                                                                                           // Add a few settings for the webview
                                                                                                           // The demo step is redundant since the values are the default settings
                                                                                                           wil::com_ptr<ICoreWebView2Settings> settings;
                                                                                                           webview->get_Settings(
                                                                                                                   &settings);
                                                                                                           settings->put_IsScriptEnabled(
                                                                                                                   TRUE);
                                                                                                           settings->put_AreDefaultScriptDialogsEnabled(
                                                                                                                   TRUE);
                                                                                                           settings->put_IsWebMessageEnabled(
                                                                                                                   TRUE);

                                                                                                           // Resize WebView to fit the bounds of the parent window
                                                                                                           RECT bounds;
                                                                                                           GetClientRect(
                                                                                                                   hWnd,
                                                                                                                   &bounds);

                                                                                                           bounds.left = bounds.left/2;
                                                                                                           webviewController->put_Bounds(
                                                                                                                   bounds);

                                                                                                           // Schedule an async task to navigate to Bing
                                                                                                           webview->Navigate(
                                                                                                                   L"https://www.bing.com/");

                                                                                                           // <NavigationEvents>
                                                                                                           // Step 4 - Navigation events
                                                                                                           // register an ICoreWebView2NavigationStartingEventHandler to cancel any non-https navigation
                                                                                                           EventRegistrationToken token;
                                                                                                           webview->add_NavigationStarting(
                                                                                                                   Microsoft::WRL::Callback<ICoreWebView2NavigationStartingEventHandler>(
                                                                                                                           [](ICoreWebView2 *webview,
                                                                                                                              ICoreWebView2NavigationStartingEventArgs *args) -> HRESULT {
                                                                                                                               wil::unique_cotaskmem_string uri;
                                                                                                                               args->get_Uri(
                                                                                                                                       &uri);
                                                                                                                               std::wstring source(
                                                                                                                                       uri.get());
                                                                                                                               if (source.substr(
                                                                                                                                       0,
                                                                                                                                       5) !=
                                                                                                                                   L"https") {
                                                                                                                                   args->put_Cancel(
                                                                                                                                           true);
                                                                                                                               }
                                                                                                                               return S_OK;
                                                                                                                           }).Get(),
                                                                                                                   &token);
                                                                                                           // </NavigationEvents>

                                                                                                           // <Scripting>
                                                                                                           // Step 5 - Scripting
                                                                                                           // Schedule an async task to add initialization script that freezes the Object object
                                                                                                           webview->AddScriptToExecuteOnDocumentCreated(
                                                                                                                   L"Object.freeze(Object);",
                                                                                                                   nullptr);
                                                                                                           // Schedule an async task to get the document URL
                                                                                                           webview->ExecuteScript(
                                                                                                                   L"window.document.URL;",
                                                                                                                   Microsoft::WRL::Callback<ICoreWebView2ExecuteScriptCompletedHandler>(
                                                                                                                           [](HRESULT errorCode,
                                                                                                                              LPCWSTR resultObjectAsJson) -> HRESULT {
                                                                                                                               LPCWSTR URL = resultObjectAsJson;
                                                                                                                               //doSomethingWithURL(URL);
                                                                                                                               return S_OK;
                                                                                                                           }).Get());
                                                                                                           // </Scripting>

                                                                                                           // <CommunicationHostWeb>
                                                                                                           // Step 6 - Communication between host and web content
                                                                                                           // Set an event handler for the host to return received message back to the web content
                                                                                                           webview->add_WebMessageReceived(
                                                                                                                   Microsoft::WRL::Callback<ICoreWebView2WebMessageReceivedEventHandler>(
                                                                                                                           [](ICoreWebView2 *webview,
                                                                                                                              ICoreWebView2WebMessageReceivedEventArgs *args) -> HRESULT {
                                                                                                                               wil::unique_cotaskmem_string message;
                                                                                                                               args->TryGetWebMessageAsString(
                                                                                                                                       &message);
                                                                                                                               // processMessage(&message);
                                                                                                                               webview->PostWebMessageAsString(
                                                                                                                                       message.get());
                                                                                                                               return S_OK;
                                                                                                                           }).Get(),
                                                                                                                   &token);

                                                                                                           // Schedule an async task to add initialization script that
                                                                                                           // 1) Add an listener to print message from the host
                                                                                                           // 2) Post document URL to the host
                                                                                                           webview->AddScriptToExecuteOnDocumentCreated(
                                                                                                                   L"window.chrome.webview.addEventListener(\'message\', event => alert(event.data));" \
                            L"window.chrome.webview.postMessage(window.document.URL);",
                                                                                                                   nullptr);
                                                                                                           // </CommunicationHostWeb>

                                                                                                           return S_OK;
                                                                                                       }).Get());
                                                             return S_OK;
                                                         }).Get());

    }

    EditorWindow::EditorWindow() : IWindow() {
        document.setEngine(&engine);
        runner = new Runner(window, document);
    }
}
