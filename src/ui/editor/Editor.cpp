#include "Editor.h"
#include "../shared/webview/WebViewPayload.h"
#include "../../services/FileSystemService.h"
#include "../../services/ShaderService.h"
#include "../../services/EngineService.h"

#include "../../services/ProjectService.h"

#define RELOAD "RELOAD"
#define GET_PROJECT_PATH "GET_PROJECT_PATH"
#define SET_PROJECT_PATH "SET_PROJECT_PATH"

namespace PEngine {

    Engine &Editor::getEngine() {
        return engine;
    }

    void Editor::runInternal() {
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();
        ImGui::ShowDemoWindow();

        engine.run();
        ImGui::Render();

        glViewport(0, 0, windowWidth, windowHeight);
        glClearColor(BACKGROUND_R, BACKGROUND_G, BACKGROUND_B, BACKGROUND_A);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
        ImGui::UpdatePlatformWindows();
        ImGui::RenderPlatformWindowsDefault();
    }

    void Editor::init() {
        auto F = FileSystemService{};
        auto E = EngineService{};
        auto S = ShaderService{};
        auto P = ProjectService{};
        createWebView("editor-window.html", {
                &F,
                &E,
                &S,
                &P
        });
    }
}
