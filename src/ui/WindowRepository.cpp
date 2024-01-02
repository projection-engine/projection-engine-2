#include <windef.h>
#include <WinUser.h>
#include "WindowRepository.h"
#include "shared/AbstractWindow.h"
#include "shared/webview/WebViewWindow.h"
#include "shared/runners/IRunner.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "imgui_impl_opengl3.h"
#include "imgui_impl_glfw.h"

namespace PEngine {

    void WindowRepository::createWindowInternal(const std::string &id, AbstractWindow *window) {
        windows[id] = window;
        window->setWindowRepository(this);

    }

    void WindowRepository::setActiveWindow(const std::string &id) {
        if (windows.count(mainWindowId)) {
            GLFWwindow *oldWindow = windows[mainWindowId]->getWindow();
            glfwDestroyWindow(oldWindow);
            glfwTerminate();
            runner->destroyContext();
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


    AbstractWindow *WindowRepository::getActiveWindow() {
        if (windows.count(mainWindowId)) {
            return windows[mainWindowId];
        }
        return nullptr;
    }

    WindowRepository::~WindowRepository() {
        ImGui_ImplOpenGL3_Shutdown();
        ImGui_ImplGlfw_Shutdown();
        ImGui::DestroyContext();
    }

    void WindowRepository::getDesktopResolution(int &horizontal, int &vertical) {
        RECT desktop;
        GetWindowRect(GetDesktopWindow(), &desktop);
        horizontal = desktop.right;
        vertical = desktop.bottom;
    }

    void WindowRepository::onError(int error, const char *description) {
        fprintf(stderr, "GLFW Error %d: %s\n", error, description);
    }

    WindowRepository::WindowRepository() {

        CONSOLE_LOG("Creating window")
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            CONSOLE_ERROR("Error initializing glfw")
            return;
        }

        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
//        glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);

        int width;
        int height;
        getDesktopResolution(width, height);

        window = glfwCreateWindow(width * .5, height * .5, "Window", nullptr, nullptr);
        if (window == nullptr) {
            CONSOLE_ERROR("Error creating window")
            return;
        }

        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        CONSOLE_LOG("WINDOW CREATED")

        IMGUI_CHECKVERSION();
        ImGui::CreateContext();
        ImGuiIO &io = ImGui::GetIO();
        (void) io;
        io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;
        io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad;
        io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;
        io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable;

        ImGui::StyleColorsDark();
        ImGuiStyle &style = ImGui::GetStyle();
        if (io.ConfigFlags & ImGuiConfigFlags_ViewportsEnable) {
            style.WindowRounding = 0.0f;
            style.Colors[ImGuiCol_WindowBg].w = 1.0f;
        }

        ImGui_ImplGlfw_InitForOpenGL(window, true);
        ImGui_ImplOpenGL3_Init(GLSL_VERSION);

        webView = new WebViewWindow();
    }

    WindowRepository *WindowRepository::get() {
        if(singleton == nullptr) { singleton = new WindowRepository; }
        return singleton;
    }

    GLFWwindow *WindowRepository::getWindow() const {
        return window;
    }

    WebViewWindow *WindowRepository::getWebView() const {
        return webView;
    }
}