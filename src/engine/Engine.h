#ifndef CATALYST_ENGINE_H
#define CATALYST_ENGINE_H

#include "entt/entity/registry.hpp"
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

        WorldSystem &getWorld();

        ResourcesSystem &getResources();

        IIOController *getIo();

        IFSController *getFs();

        void run();
    };
}

#endif
