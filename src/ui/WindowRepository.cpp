#include "WindowRepository.h"
#include "shared/IWindow.h"
#include "shared/runners/IRunner.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "shared/ImGuiContextUtil.h"

namespace PEngine {
    void WindowRepository::createWindowInternal(const std::string &id, IWindow *window) {
        windows[id] = window;
        window->setWindowRepository(this);

    }

    void WindowRepository::setActiveWindow(const std::string &id) {
        if (windows.count(mainWindowId)) {
            GLFWwindow *oldWindow = windows[mainWindowId]->getWindow();
            glfwDestroyWindow(oldWindow);
            glfwTerminate();
            runner->destroyContext();
            ImGuiContextUtil::destroy();
            delete runner;
        }
        mainWindowId = id;

        runner = windows[id]->initialize();
        GLFWwindow *glfwWindow = windows[id]->getWindow();
        if (runner == nullptr) {
            runner = new IRunner(glfwWindow);
        }
        while (!glfwWindowShouldClose(glfwWindow)) {
            glfwPollEvents();
            runner->run();
            glfwMakeContextCurrent(glfwGetCurrentContext());
            glfwSwapBuffers(glfwWindow);
        }
    }

    IWindow *WindowRepository::getActiveWindow() {
        if (windows.count(mainWindowId)) {
            return windows[mainWindowId];
        }
        return nullptr;
    }
}