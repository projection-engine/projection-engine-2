#ifndef PROJECTION_IRUNNER_H
#define PROJECTION_IRUNNER_H

#include "glad/glad.h"
#include "GLFW/glfw3.h"
#include "../../util/debug/ILoggable.h"
#include "../shared/document/Document.h"

namespace PEngine {
    class IRunner : public ILoggable {
    protected:
        GLFWwindow *window = nullptr;
        Document document;
        bool isRunning = false;
        int windowWidth = 0;
        int windowHeight = 0;

        virtual void update() {}

        virtual void startNewFrame() {}

        virtual void render() {}

        virtual void drawNewFrame() {}

        virtual void clearWindow() {}

        virtual void updateViewports() {}

    public:

        explicit IRunner(GLFWwindow *w) {
            window = w;
        }

        virtual void destroyContext(){}

        void run() {
            update();
            startNewFrame();
            render();
            drawNewFrame();
            clearWindow();
            updateViewports();
        }
    };
}

#endif
