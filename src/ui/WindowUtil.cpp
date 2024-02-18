#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include <wrl.h>
#include "imgui_impl_opengl3.h"
#include "imgui_impl_glfw.h"
#include "WindowUtil.h"
#include "spdlog/spdlog.h"
#include "../engine/definitions.h"

namespace PEngine {
    void WindowUtil::getDesktopResolution(int &horizontal, int &vertical) {
        RECT desktop;
        GetWindowRect(GetDesktopWindow(), &desktop);
        horizontal = desktop.right;
        vertical = desktop.bottom;
    }

    void WindowUtil::onError(int error, const char *description) {
        fprintf(stderr, "GLFW Error %d: %s\n", error, description);
    }

    GLFWwindow *WindowUtil::createWindow(float scaleX, float scaleY) {
        glfwSetErrorCallback(onError);
        if (!glfwInit()) {
            throw std::runtime_error("Error initializing GLFW");
        }

        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
//        glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);

        int width;
        int height;
        getDesktopResolution(width, height);

        auto *window = glfwCreateWindow(width * scaleX, height * scaleY, "Window", nullptr, nullptr);
        if (window == nullptr) {
            return nullptr;
        }
        return window;
    }

    void WindowUtil::configureImgui(GLFWwindow *window) {
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
}
