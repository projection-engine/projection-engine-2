#ifndef PROJECTION_RUNNER_H
#define PROJECTION_RUNNER_H

#include "../../shared/runners/IRunner.h"
#include "../../../engine/Engine.h"
#include "IOController.h"
#include "FSController.h"

#define BACKGROUND_R .5
#define BACKGROUND_G .5
#define BACKGROUND_B .5
#define BACKGROUND_A 1

namespace PEngine {
    class Document;

    class Runner : public IRunner {
    private:
        Engine engine = Engine(new IOController, new FSController);

    protected:

        void update() override;

        void startNewFrame() override;

        void render() override;

        void drawNewFrame() override;

        void clearWindow() override;

        void updateViewports() override;

    public:

        explicit Runner(GLFWwindow *w) : IRunner(w) {
        }

        void destroyContext() override;

        const Engine &getEngine() const;
    };

}

#endif
