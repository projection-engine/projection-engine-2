#ifndef PROJECTION_ENGINE_H
#define PROJECTION_ENGINE_H

#include "world/WorldSystem.h"
#include "resource/ResourcesSystem.h"
#include "runtime/RuntimeSystem.h"

namespace PEngine {
    class IIOController;

    class IFSController;

    class Engine {
    private:
        WorldSystem world;
        ResourcesSystem resources;
        RuntimeSystem systems;
        IIOController *io = nullptr;
        IFSController *fs = nullptr;
    public:

        explicit Engine(IIOController *ioController, IFSController *fsController);

        explicit Engine() = default;

        WorldSystem &getWorld();

        ResourcesSystem &getResources();

        IIOController *getIo();

        IFSController *getFs();

        void run();
    };
}

#endif
