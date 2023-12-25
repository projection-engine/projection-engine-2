#include "WindowSystem.h"
#include "shared/IWindow.h"
#include "shared/runners/IRunner.h"
#include "GLFW/glfw3.h"

namespace PEngine {
    void WindowSystem::createWindowInternal(const std::string &id, IWindow *window) {
        windows[id] = window;
        window->setWindowSystem(this);

    }

    void WindowSystem::activateMainWindow(const std::string &id) {
        if (windows.count(mainWindowId)) {
            GLFWwindow *oldWindow = windows[mainWindowId]->getWindow();
            glfwDestroyWindow(oldWindow);
            glfwTerminate();
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
}