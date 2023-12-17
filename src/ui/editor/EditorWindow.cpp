#include "EditorWindow.h"
#include "runner/Runner.h"

namespace PEngine {
    void EditorWindow::onInitialize() {
        // TODO - START WEBVIEW CONTEXT
    }

    EditorWindow::EditorWindow() : IWindow() {
        document.setEngine(&engine);
        runner = new Runner(window, document);
    }
}
