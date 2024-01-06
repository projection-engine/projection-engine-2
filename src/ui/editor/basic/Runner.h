#ifndef PROJECTION_RUNNER_H
#define PROJECTION_RUNNER_H

#include "../../shared/runners/IRunner.h"
#include "IOController.h"
#include "FSController.h"

#define BACKGROUND_R .5
#define BACKGROUND_G .5
#define BACKGROUND_B .5
#define BACKGROUND_A 1

namespace PEngine {
    class Engine;

    class Runner : public IRunner {
    private:
        Engine *engine = nullptr;

        void initiate();

    protected:

        void startNewFrame() override;

        void render() override;

        void drawNewFrame() override;

        void clearWindow() override;

        void updateViewports() override;


    public:

        explicit Runner() {
            initiate();
        }

        void destroyContext() override;
    };

}

#endif
