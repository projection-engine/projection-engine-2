#include "IWindow.h"
#include "document/Document.h"
#include "runner/Runner.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"

namespace PEngine {
    void IWindow::createWindowIO() {
        IMGUI_CHECKVERSION();
        ImGui::CreateContext();
        ImGuiIO &io = ImGui::GetIO();
        (void) io;
        io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;     // Enable Keyboard Controls
        io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad;      // Enable Gamepad Controls
        io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;         // Enable Docking
        io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable;       // Enable Multi-Viewport / Platform Windows

        ImGui::StyleColorsDark();
        ImGuiStyle &style = ImGui::GetStyle();
        if (io.ConfigFlags & ImGuiConfigFlags_ViewportsEnable) {
            style.WindowRounding = 0.0f;
            style.Colors[ImGuiCol_WindowBg].w = 1.0f;
        }
    }

    IWindow::IWindow() {
        CONSOLE_LOG("INITIALIZING...")
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            CONSOLE_ERROR("ERROR INITIALIZING GLFW")
            return;
        }
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

        window = glfwCreateWindow(1280, 720, "Window", nullptr, nullptr);
        if (window == nullptr) {
            CONSOLE_ERROR("ERROR CREATING WINDOW")
            return;
        }

        glfwMakeContextCurrent(window);
        setVsyncEnabled(true);
        createWindowIO();

        ImGui_ImplGlfw_InitForOpenGL(window, true);
        ImGui_ImplOpenGL3_Init(GLSL_VERSION);
        CONSOLE_LOG("WINDOW CREATED")
        ready = true;
    }

    void IWindow::start() {
        if (!ready || runner == nullptr) {
            return;
        }
        runner->run();
        CONSOLE_LOG("SHUTTING DOWN")
        ImGui_ImplOpenGL3_Shutdown();
        ImGui_ImplGlfw_Shutdown();
        ImGui::DestroyContext();

        glfwDestroyWindow(window);
        glfwTerminate();
    }

    Document &IWindow::getDocument() {
        return document;
    }

    bool IWindow::isVsyncEnabled() const {
        return vsyncEnabled;
    }

    void IWindow::setVsyncEnabled(bool v) {
        glfwSwapInterval(v ? 1 : 0);
        IWindow::vsyncEnabled = v;
    }

    void IWindow::onInitialize() {

    }
}