#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/IWindow.h"

namespace PEngine {
    class WebViewWindow;

    class IRunner;

    class Editor : public IWindow {
    private:
        static void onMessage(WebViewPayload &payload);

        std::string projectPath;
    public:

        explicit Editor() : IWindow("Project Editor") {}

        IRunner *initialize() override;

        void setProject(const std::string &pathToMetadata);
    };
}

#endif
