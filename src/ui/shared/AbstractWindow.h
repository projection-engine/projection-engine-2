#ifndef PROJECTION_ABSTRACTWINDOW_H
#define PROJECTION_ABSTRACTWINDOW_H

#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "imgui_impl_opengl3.h"
#include "imgui_impl_glfw.h"

#include "../../util/debug/ILoggable.h"
#include "../../util/Definitions.h"
#include "webview/WebViewWindow.h"
#include <unordered_map>
#include <string>


namespace PEngine {
    class AbstractService;

    class WebViewPayload;

    class AbstractWindow : public ILoggable {
    protected:
        std::unordered_map<std::string, WebViewWindow> webViews;
        int windowWidth;
        int windowHeight;
        GLFWwindow *window = nullptr;
        HWND__ *nativeWindow = nullptr;

        virtual void runInternal() {}

    public:

        explicit AbstractWindow(const char *name, float scaleX, float scaleY);

        void createWebView(const std::string &path, std::function<void(WebViewWindow *webView)> callback);

        GLFWwindow *getWindow();

        void run() const;

        virtual void onResize();

        HWND__ *getNativeWindow();
    };
}
#endif
