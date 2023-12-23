#include "IWindow.h"
#include "runner/Runner.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"
#include "wtypes.h"
#include "webview/WebViewWindow.h"

namespace PEngine {
    void IWindow::getDesktopResolution(int &horizontal, int &vertical) {
        RECT desktop;
        GetWindowRect(GetDesktopWindow(), &desktop);
        horizontal = desktop.right;
        vertical = desktop.bottom;
    }

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

    void IWindow::initialize() {
        runner = createRunner();
    }

    IRunner *IWindow::createRunner() {
        return nullptr;
    }

    void IWindow::removeWebView(const std::string &id) {
        if (webViews.contains(id)) {
            webViews.erase(id);
        }
    }

    void IWindow::addWebView(const std::string &id, const std::string &filePath) {
        webViews[id] = new WebViewWindow(filePath, this);
    }

    void IWindow::addWebViewEventListener(const std::string &id,
                                          void (*action)(ICoreWebView2 *, ICoreWebView2WebMessageReceivedEventArgs *,IWindow *)) {
        webViews[id]->addMessageListener(action);
    }

    void IWindow::postWebViewMessage(const std::string &id, std::string message) {
        webViews[id]->postMessage(std::move(message));
    }

    IWindow::IWindow(const std::string &name) {
        CONSOLE_LOG("Creating window")
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            CONSOLE_ERROR("Error initializing glfw")
            return;
        }
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

        int width;
        int height;
        getDesktopResolution(width, height);
        window = glfwCreateWindow(width * scaleX, height * scaleY, name.c_str(), nullptr, nullptr);
        if (window == nullptr) {
            CONSOLE_ERROR("Error creating window")
            return;
        }

        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        createWindowIO();

        ImGui_ImplGlfw_InitForOpenGL(window, true);
        ImGui_ImplOpenGL3_Init(GLSL_VERSION);
        CONSOLE_LOG("WINDOW CREATED")
        ready = true;
    }

    IWindow::~IWindow() {
        for (std::pair<const std::basic_string<char>, WebViewWindow *> entry: webViews) {
            delete entry.second;
        }
        delete runner;
    }

    GLFWwindow *IWindow::getWindow() const {
        return window;
    }
}