#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/AbstractWindow.h"

namespace PEngine {
    class WebViewWindow;

    class IRunner;

    class Editor : public AbstractWindow {
    private:
        static void onMessage(WebViewPayload &payload);

        std::string projectPath;
    public:

        explicit Editor() : AbstractWindow("Project Editor") {}

        IRunner *initialize() override;

        void setProject(const std::string &pathToMetadata);

        const std::string &getProject();
    };
}

#endif
