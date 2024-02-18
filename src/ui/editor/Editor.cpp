#include "Editor.h"
#include "../shared/webview/WebViewPayload.h"
#include "../../services/FileSystemService.h"
#include "../../services/ShaderService.h"
#include "../../services/EngineService.h"
#include "../../services/ProjectService.h"

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

        createWebView(
                "editor-window.html",
                [](WebViewWindow *webView) {
                    FileSystemService::BindEvents(webView);
                    EngineService::BindEvents(webView);
                    ShaderService::BindEvents(webView);
                    ProjectService::BindEvents(webView);
                }
        );
    }
}
