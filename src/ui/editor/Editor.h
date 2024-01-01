#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/IWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"
#include "../shared/runners/IRunner.h"

namespace PEngine {
    class WebViewWindow;

    class Editor : public IWindow {
    private:
        static void onMessage(WebViewPayload &payload);

        std::string projectPath;
    public:

        explicit Editor() : IWindow("Project Editor"){}

        IRunner* initialize() override;

        void setProject(const std::string &pathToMetadata);
    };
}

#endif
