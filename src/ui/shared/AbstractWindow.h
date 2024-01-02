#pragma once
#ifndef PROJECTION_ABSTRACTWINDOW_H
#define PROJECTION_ABSTRACTWINDOW_H

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

    class AbstractWindow : public ILoggable {
    protected:
        GLFWwindow *window = nullptr;
        WindowRepository *windowRepository = nullptr;
        WebViewWindow *webView = nullptr;
        std::string name;

        void addWebView(const std::string &id, const std::string &filePath);
    public:

        explicit AbstractWindow(const std::string &name);

        virtual IRunner *initialize() {}

        void addWebViewEventListener(const std::string &listenerId, void (*action)(WebViewPayload &));

        GLFWwindow *getWindow() const;

        void setWindowRepository(WindowRepository *windowRepository);

        const std::string &getName() const;

        WindowRepository *getWindowRepository() const;

        void postWebViewMessage(const std::string &listenerId, const std::string &message);

        void setWindow(GLFWwindow *window);
    };
}
#endif
