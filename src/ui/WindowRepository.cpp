#include "WindowRepository.h"
#include "shared/AbstractWindow.h"
#include "shared/webview/WebViewWindow.h"
#include "shared/runners/IRunner.h"
#include "GLFW/glfw3native.h"
#include "../engine/definitions.h"

namespace PEngine {
    WindowRepository *WindowRepository::singleton = nullptr;

    void WindowRepository::createWindowInternal(const std::string &id, AbstractWindow *window) {
        windows[id] = window;
    }

    void WindowRepository::activateWindow(const std::string &id) {
        if (windows.count(mainWindowId)) {
            runner->destroyContext();
            delete runner;
        }
        mainWindowId = id;
        runner = windows[id]->initialize();
        glfwSetWindowTitle(window, windows[id]->getName().c_str());
        if (runner == nullptr) {
            runner = new IRunner;
        }
        webView->setHTMLFile(windows[id]->getWebViewHTML());
    }


    AbstractWindow *WindowRepository::getActiveWindow() {
        if (windows.count(mainWindowId)) {
            return windows[mainWindowId];
        }
        return nullptr;
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

    void WindowRepository::initialize() {

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

        glfwSetFramebufferSizeCallback(window, windowResizeCallback);
        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        CONSOLE_LOG("WINDOW CREATED")
        initializeImGui();
        webView = new WebViewWindow();
        runner = new IRunner;
    }

    void WindowRepository::run() {
        while (!glfwWindowShouldClose(window)) {
            glfwPollEvents();
            runner->run();
            glfwMakeContextCurrent(glfwGetCurrentContext());
            glfwSwapBuffers(window);
        }

        glfwDestroyWindow(window);
        glfwTerminate();

        ImGui_ImplOpenGL3_Shutdown();
        ImGui_ImplGlfw_Shutdown();
        ImGui::DestroyContext();
    }

    void WindowRepository::initializeImGui() const {
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
    }

    WindowRepository &WindowRepository::Get() {
        if(singleton == nullptr){
            singleton = new WindowRepository;
        }
        return *singleton;
    }

    GLFWwindow *WindowRepository::getWindow() const {
        return window;
    }

    WebViewWindow *WindowRepository::getWebView() const {
        return webView;
    }

    AbstractWindow *WindowRepository::getWindowById(const std::string &windowId) {
        if (windows.count(windowId)) {
            return windows[windowId];
        }
        return nullptr;
    }

    void WindowRepository::windowResizeCallback(GLFWwindow *window, int width, int height) {
        WindowRepository::Get().webView->resize();
    }
}
