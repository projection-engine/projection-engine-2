#ifndef PROJECTION_IRUNNER_H
#define PROJECTION_IRUNNER_H

#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "../../util/debug/ILoggable.h"

namespace PEngine {
    class IRunner : public ILoggable {
    protected:
        int windowWidth = 0;
        int windowHeight = 0;

        virtual void startNewFrame() {}

        virtual void render() {}

        virtual void drawNewFrame() {}

        virtual void clearWindow() {}

        virtual void updateViewports() {}

    public:

        virtual void destroyContext(){}

        void run() {
            startNewFrame();
            render();
            drawNewFrame();
            clearWindow();
            updateViewports();
        }
    };
}

#endif
