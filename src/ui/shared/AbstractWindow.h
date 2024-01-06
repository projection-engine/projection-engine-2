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

    class WebViewPayload;

    class AbstractWindow : public ILoggable {
    protected:
        std::string name;

    public:

        explicit AbstractWindow(const std::string &name);

        virtual IRunner *initialize();

        std::string getName();

        virtual const char *getWebViewHTML();
    };
}
#endif
