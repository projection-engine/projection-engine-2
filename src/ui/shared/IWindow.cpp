#include "IWindow.h"
#include "basic/Runner.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"
#include "wtypes.h"
#include "webview/WebViewWindow.h"
#include "webview/WebViewPayload.h"

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

    void IWindow::removeWebView(const std::string &id) {
        if (webViews.contains(id)) {
            webViews.erase(id);
        }
    }

    void IWindow::addWebView(const std::string &id, const std::string &filePath) {
        webViews[id] = new WebViewWindow(filePath, this);
    }

    void IWindow::addWebViewEventListener(const std::string &webviewId, const std::string &listenerId,
                                          void (*action)(WebViewPayload &)) {
        webViews[webviewId]->addMessageListener(listenerId, action);
    }

    void IWindow::postWebViewMessage(const std::string &webviewId, const std::string &listenerId, const std::string& message) {
        webViews[webviewId]->postMessage(message, listenerId);
    }

    void IWindow::setWindowResizable(bool isResizable) {
        glfwWindowHint(GLFW_RESIZABLE, isResizable ? GLFW_TRUE : GLFW_FALSE);
    }

    IWindow::IWindow(const std::string &name) {
        this->name = name;
    }

    IWindow::~IWindow() {
        for (const std::pair<const std::basic_string<char>, WebViewWindow *>& entry: webViews) {
            delete entry.second;
        }
    }

    GLFWwindow *IWindow::getWindow() const {
        return window;
    }

    void IWindow::setWindowRepository(WindowRepository *wr) {
        this->windowRepository = wr;
    }

    IRunner *IWindow::initialize() {
        CONSOLE_LOG("Creating window")
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            CONSOLE_ERROR("Error initializing glfw")
            return nullptr;
        }
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
//        glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);

        int width;
        int height;
        getDesktopResolution(width, height);
        window = glfwCreateWindow(width * scaleX, height * scaleY, name.c_str(), nullptr, nullptr);
        if (window == nullptr) {
            CONSOLE_ERROR("Error creating window")
            return nullptr;

        }

        glfwMakeContextCurrent(window);
        glfwSwapInterval(1);

        createWindowIO();

        ImGui_ImplGlfw_InitForOpenGL(window, true);
        ImGui_ImplOpenGL3_Init(GLSL_VERSION);
        CONSOLE_LOG("WINDOW CREATED")
        return nullptr;
    }

    WindowRepository *IWindow::getWindowRepository() const {
        return windowRepository;
    }
}