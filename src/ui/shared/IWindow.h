#pragma once
#ifndef PROJECTION_IWINDOW_H
#define PROJECTION_IWINDOW_H

#include <imgui_impl_glfw.h>
#include "imgui.h"
#include "../../util/debug/ILoggable.h"
#include "document/Document.h"
#include "../../util/Definitions.h"
#include <unordered_map>
#include <string>


class ICoreWebView2;

class ICoreWebView2WebMessageReceivedEventArgs;


namespace PEngine {
    class IRunner;

    class WebViewWindow;

    class WebViewPayload;

    class IWindow : public ILoggable {
    protected:
        GLFWwindow *window = nullptr;
        Document document;
        IRunner *runner = nullptr;
        std::unordered_map<std::string, WebViewWindow *> webViews;

        float scaleX = .5;
        float scaleY = .5;
        bool ready = false;

        static void getDesktopResolution(int &horizontal, int &vertical);

        static void onError(int error, const char *description) {
            fprintf(stderr, "GLFW Error %d: %s\n", error, description);
        }

        void createWindowIO();

        virtual IRunner *createRunner();

        void addWebView(const std::string &id, const std::string &filePath);

        void removeWebView(const std::string &id);

    public:
        ~IWindow();

        explicit IWindow(const std::string &name);

        virtual void initialize();

        void start();

        void addWebViewEventListener(const std::string &webviewId, const std::string &listenerId, void (*action)(WebViewPayload &));

        void postWebViewMessage(const std::string &id, std::string message);

        GLFWwindow *getWindow() const;

        void setWindowResizable(bool isResizable);
    };
}
#endif