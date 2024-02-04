#include "Runner.h"
#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"
#include "../../../engine/Engine.h"
#include "../../WindowRepository.h"


namespace PEngine {
    void Runner::render() {
        ImGui::ShowDemoWindow();
    }

    void Runner::updateViewports() {
        ImGui::UpdatePlatformWindows();
        ImGui::RenderPlatformWindowsDefault();
    }

    void Runner::startNewFrame() {
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();
    }

    void Runner::drawNewFrame() {
        engine->run();
        ImGui::Render();
        glfwGetFramebufferSize(WindowRepository::Get().getWindow(), &windowWidth, &windowHeight);
        glViewport(0, 0, windowWidth, windowHeight);
    }

    void Runner::clearWindow() {
        glClearColor(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B, BACKGROUND_A);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
    }

    void Runner::initiate() {
        int w, h;
        WindowRepository::getDesktopResolution(w, h);
        engine = new Engine(w, h, new IOController, new FSController);
    }

    void Runner::destroyContext() {
        delete engine;
    }
}
