#ifndef PROJECTION_WINDOWREPOSITORY_H
#define PROJECTION_WINDOWREPOSITORY_H

#include <string>
#include <unordered_map>
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "../util/debug/ILoggable.h"
#include <wrl.h>
#include "imgui_impl_opengl3.h"
#include "imgui_impl_glfw.h"

namespace PEngine {
    class AbstractWindow;

    class IRunner;

    class WebViewWindow;

    class WindowRepository : public ILoggable {
    private:
        static void windowResizeCallback(GLFWwindow *window, int width, int height);

        static WindowRepository singleton;
        GLFWwindow *window = nullptr;
        WebViewWindow *webView = nullptr;
        IRunner *runner = nullptr;
        std::unordered_map<std::string, AbstractWindow *> windows;
        std::string mainWindowId;

        void createWindowInternal(const std::string &id, AbstractWindow *window);

        static void getDesktopResolution(int &horizontal, int &vertical);

        static void onError(int error, const char *description);

    public:
        static WindowRepository &Get();

        void initialize();

        template<class W>
        void createWindow(const std::string &id) {
            createWindowInternal(id, new W);
        }

        void activateWindow(const std::string &id);

        AbstractWindow *getActiveWindow();

        GLFWwindow *getWindow() const;

        WebViewWindow *getWebView() const;

        void initializeImGui() const;

        AbstractWindow *getWindowById(const std::string &windowId);

        void run();


    };

}

#endif
