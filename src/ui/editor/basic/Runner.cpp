#include "Runner.h"
#include "../../shared/elements/IElement.h"
#include "../../shared/views/IView.h"
#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"
#include "../../shared/ImGuiContextUtil.h"
#include "../../../engine/Engine.h"


namespace PEngine {
    void Runner::update() {
        auto &list = document.getViews();
        document.getViews().iterate();
        while (list.hasNext()) {
            auto *next = list.next();
            next->update();
        }
    }

    void Runner::render() {
        ImGui::ShowDemoWindow();
        auto &list = document.getElements();
        list.iterate();
        while (list.hasNext()) {
            auto *next = list.next();
            if (next->isActive()) {
                next->render();
            }
        }
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
        glfwGetFramebufferSize(window, &windowWidth, &windowHeight);
        glViewport(0, 0, windowWidth, windowHeight);
    }

    void Runner::clearWindow() {
        glClearColor(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B, BACKGROUND_A);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
    }

    void Runner::initiate() {
        engine = new Engine(new IOController, new FSController);
    }

    void Runner::destroyContext() {
        delete engine;
    }
}
