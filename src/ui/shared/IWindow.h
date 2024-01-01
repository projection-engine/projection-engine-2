#pragma once
#ifndef PROJECTION_IWINDOW_H
#define PROJECTION_IWINDOW_H

#include "../../util/debug/ILoggable.h"
#include "../../util/Definitions.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include <unordered_map>
#include <string>


class ICoreWebView2;

class ICoreWebView2WebMessageReceivedEventArgs;


namespace PEngine {
    class IRunner;

    class WebViewWindow;

    class WindowRepository;

    class WebViewPayload;

    class IWindow : public ILoggable {
    protected:
        GLFWwindow *window = nullptr;
        std::unordered_map<std::string, WebViewWindow *> webViews;
        WindowRepository *windowRepository = nullptr;
        std::string name;
        float scaleX = .5;
        float scaleY = .5;

        static void getDesktopResolution(int &horizontal, int &vertical);

        static void onError(int error, const char *description) {
            fprintf(stderr, "GLFW Error %d: %s\n", error, description);
        }

        void addWebView(const std::string &id, const std::string &filePath);

        void removeWebView(const std::string &id);

    public:

        ~IWindow();

        explicit IWindow(const std::string &name);

        virtual IRunner *initialize();

        void addWebViewEventListener(const std::string &webviewId, const std::string &listenerId,
                                     void (*action)(WebViewPayload &));

        GLFWwindow *getWindow() const;

        void setWindowResizable(bool isResizable);

        void setWindowRepository(WindowRepository *windowRepository);

        WindowRepository *getWindowRepository() const;

        void
        postWebViewMessage(const std::string &webviewId, const std::string &listenerId, const std::string &message);
    };
}
#endif
