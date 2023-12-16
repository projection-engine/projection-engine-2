#include "EditorWindow.h"
#include "../../core/document/Document.h"
#include "views/hierarchy/HierarchyView.h"
#include "views/MainView.h"
#include "runner/Runner.h"
#include "../../../engine/Engine.h"

namespace PEngine {
    void EditorWindow::onInitialize() {
        Document::registerView("MainView", new MainView);
        Document::registerView("HierarchyView", new HierarchyView);
        document.addView("MainView");
    }

    EditorWindow::EditorWindow() : IWindow() {
        document.setEngine(&engine);
        runner = new Runner(window, document);
    }
}
