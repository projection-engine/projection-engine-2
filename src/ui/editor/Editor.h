#ifndef PROJECTION_EDITOR_H
#define PROJECTION_EDITOR_H

#include "../shared/AbstractWindow.h"
#include "../../engine/Engine.h"

#define BACKGROUND_R .5
#define BACKGROUND_G .5
#define BACKGROUND_B .5
#define BACKGROUND_A 1
namespace PEngine {
    struct Editor : public AbstractWindow {
    private:
        void init();

    public:
        Engine engine;
        long bottomViewHeight = 250;
        long rightViewWidth = 250;
        long leftViewWidth = 250;
        std::string projectPath;

        static void BindServices(WebViewWindow *webView);

        explicit Editor() : AbstractWindow("Projection Engine", .5, .5) {
            init();
        }

        void runInternal() override;

        Engine &getEngine();

        void onResize() override;

        void setWindowSize(const std::string &windowId, long top, long bottom, long left, long right);


    };
}

#endif
