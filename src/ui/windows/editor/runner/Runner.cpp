#include "Runner.h"
#include "../../../core/elements/IElement.h"
#include "../../../core/views/IView.h"
#include "../../../core/document/Document.h"
#include "imgui.h"
#include "../../../../engine/Engine.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"


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

    void Runner::updateViewports() const {
        GLFWwindow *backup_current_context = glfwGetCurrentContext();
        ImGui::UpdatePlatformWindows();
        ImGui::RenderPlatformWindowsDefault();
        glfwMakeContextCurrent(backup_current_context);
    }

    void Runner::startNewFrame() {
        glfwPollEvents();
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();
    }

    void Runner::drawNewFrame() {
        document.getEngine()->run();
        ImGui::Render();
        glfwGetFramebufferSize(window, &windowWidth, &windowHeight);
        glViewport(0, 0, windowWidth, windowHeight);
    }

    void Runner::clearWindow() {
        glClearColor(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B, BACKGROUND_A);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
    }

    void Runner::run() {
        if (isRunning) {
            return;
        }
        isRunning = true;
        while (!glfwWindowShouldClose(window)) {
            update();
            startNewFrame();
            render();
            drawNewFrame();
            clearWindow();
            updateViewports();
            glfwSwapBuffers(window);
        }
    }

    int Runner::getWindowWidth() const {
        return windowWidth;
    }

    void Runner::setWindowWidth(int ww) {
        Runner::windowWidth = ww;
    }

    int Runner::getWindowHeight() const {
        return windowHeight;
    }

    void Runner::setWindowHeight(int wh) {
        Runner::windowHeight = wh;
    }

}
