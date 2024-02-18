#pragma once
#ifndef PROJECTION_ABSTRACTWINDOW_H
#define PROJECTION_ABSTRACTWINDOW_H

#include "../../util/debug/ILoggable.h"
#include "../../util/Definitions.h"
#include "webview/WebViewWindow.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "imgui_impl_opengl3.h"
#include "imgui_impl_glfw.h"
#include <unordered_map>
#include <string>


namespace PEngine {
    class AbstractService;

    class WebViewPayload;

    class AbstractWindow : public ILoggable {
    protected:
        std::unordered_map<std::string, WebViewWindow> webViews;
        GLFWwindow *window = nullptr;
        int windowWidth;
        int windowHeight;

        virtual void runInternal() {}

    public:

        explicit AbstractWindow(const char *name, float scaleX, float scaleY);

        void createWebView(const std::string &pathToHTML, const std::vector<AbstractService*>& servicesToBind);

        GLFWwindow *getWindow();

        void run();

        virtual void onResize();
    };
}
#endif
