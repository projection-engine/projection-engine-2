#include "AbstractWindow.h"
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"
#include "../WindowUtil.h"
#include "../AbstractService.h"

namespace PEngine {
    AbstractWindow::AbstractWindow(const char *name, float scaleX, float scaleY) {
        window = WindowUtil::createWindow(scaleX, scaleY);
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

    void AbstractWindow::run() {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
            runInternal();
            glfwMakeContextCurrent(glfwGetCurrentContext());
            glfwSwapBuffers(window);
        }

        glfwDestroyWindow(window);
        glfwTerminate();

        ImGui_ImplOpenGL3_Shutdown();
        ImGui_ImplGlfw_Shutdown();
        ImGui::DestroyContext();
    }

    void
    AbstractWindow::createWebView(const std::string &pathToHTML, const std::vector<AbstractService *> &servicesToBind) {
        webViews.emplace(pathToHTML, WebViewWindow(pathToHTML, *this));

        for (auto *service: servicesToBind) {
            service->bindEvents(webViews.at(pathToHTML));
        }
    }

    GLFWwindow *AbstractWindow::getWindow() {
        return window;
    }

    void AbstractWindow::onResize() {

    }
}
