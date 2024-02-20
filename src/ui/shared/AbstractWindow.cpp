#include "AbstractWindow.h"

#include <utility>
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"
#include "../WindowUtil.h"
#include "../AbstractService.h"

#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_EXPOSE_NATIVE_WIN32

#include "GLFW/glfw3native.h"

namespace PEngine {
    AbstractWindow::AbstractWindow(const char *name, float scaleX, float scaleY) {
        window = WindowUtil::createWindow(scaleX, scaleY);
        nativeWindow = glfwGetWin32Window(window);
        glfwSetWindowTitle(window, name);
        auto resizeCallback = [](GLFWwindow *w, int width, int height) {
            auto self = static_cast<AbstractWindow *>(glfwGetWindowUserPointer(w));
            self->windowWidth = width;
            self->windowHeight = height;
            self->onResize();
        };
        glfwSetWindowUserPointer(window, static_cast<void *>(this));
        glfwSetFramebufferSizeCallback(window, resizeCallback);
        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        WindowUtil::configureImgui(window);
        glfwGetFramebufferSize(window, &windowWidth, &windowHeight);
    }

    void AbstractWindow::run() const {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
//            runInternal();
            glfwMakeContextCurrent(glfwGetCurrentContext());
            glfwSwapBuffers(window);
        }

        glfwDestroyWindow(window);
        glfwTerminate();

        ImGui_ImplOpenGL3_Shutdown();
        ImGui_ImplGlfw_Shutdown();
        ImGui::DestroyContext();
    }

    void AbstractWindow::createWebView(const std::string &id, const std::string &path,
                                       std::function<void(WebViewWindow *webView)> callback) {
        webViews.emplace(
                id,
                WebViewWindow(this, path, std::move(callback))
        );
        webViews.at(id).init();
    }

    void AbstractWindow::onResize() {

    }

    WebViewWindow &AbstractWindow::getWebView(const std::string &id) {
        return webViews.at(id);
    }

    HWND__ *AbstractWindow::getNativeWindow() {
        return nativeWindow;
    }
}
