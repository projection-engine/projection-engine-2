#include "Editor.h"
#include "../shared/webview/WebViewPayload.h"
#include "../../services/FileSystemService.h"
#include "../../services/ShaderService.h"
#include "../../services/EngineService.h"
#include "../../services/ProjectService.h"

#define HEADER_HEIGHT 32
#define HEADER "header-bar"
#define LEFT "left-view"
#define BOTTOM "bottom-view"
#define RIGHT "right-view"
#define VIEW_HTML "view-window.html"

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

    void Editor::BindServices(WebViewWindow *webView) {
        FileSystemService::BindEvents(webView);
        EngineService::BindEvents(webView);
        ShaderService::BindEvents(webView);
        ProjectService::BindEvents(webView);
    }

    void Editor::init() {
        createWebView(HEADER, "header-window.html", Editor::BindServices);
        createWebView(LEFT, VIEW_HTML, Editor::BindServices);
        createWebView(BOTTOM, VIEW_HTML, Editor::BindServices);
        createWebView(RIGHT, VIEW_HTML, Editor::BindServices);
    }

    void Editor::setWindowSize(const std::string &windowId, long top, long bottom, long left, long right) {
        RECT bounds;
        bounds.top = top;
        bounds.bottom = bottom;
        bounds.left = left;
        bounds.right = right;
        WebViewWindow &window = getWebView(windowId);
        window.setBounds(bounds);
    }

    void Editor::onResize() {
        RECT bounds;
        GetClientRect(getNativeWindow(), &bounds);
        long height = bounds.bottom;
        long width = bounds.right;

        setWindowSize(HEADER, 0, HEADER_HEIGHT, 0, width);
        setWindowSize(BOTTOM, height - bottomViewHeight, height, 0, width);
        setWindowSize(LEFT, HEADER_HEIGHT, height - bottomViewHeight, 0, leftViewWidth);
        setWindowSize(RIGHT, HEADER_HEIGHT, height - bottomViewHeight, width - rightViewWidth, width);
    }
}
