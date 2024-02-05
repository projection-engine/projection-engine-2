#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/AbstractWindow.h"
#include "../../services/FileSystemService.h"
#include "../../services/ShaderService.h"
#include "../../engine/Engine.h"
#include "../../services/HierarchyService.h"

namespace PEngine {
    class WebViewWindow;

    class IRunner;

    class Editor : public AbstractWindow {
    private:
        static void onMessage(WebViewPayload &payload);
        static std::string projectPath;
        FileSystemService fileSystemService;
        HierarchyService hierarchyService;
        ShaderService shaderService;
        Engine engine;
    public:

        explicit Editor() : AbstractWindow("Project Editor") {}

        IRunner *initialize() override;

        const char *getWebViewHTML() override;

        Engine &getEngine();
    };
}

#endif
