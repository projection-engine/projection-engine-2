#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/AbstractWindow.h"
#include "../../engine/Engine.h"

#define BACKGROUND_R .5
#define BACKGROUND_G .5
#define BACKGROUND_B .5
#define BACKGROUND_A 1
namespace PEngine {
    class Editor : public AbstractWindow {
    private:
        Engine engine;

        void init();

        static void BindServices(WebViewWindow *webView);
    public:
        std::string projectPath;

        explicit Editor() : AbstractWindow("Projection Engine", .5, .5) {
            init();
        }

        void runInternal() override;

        Engine &getEngine();

    };
}

#endif
