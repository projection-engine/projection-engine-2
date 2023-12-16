#include "Engine.h"
#include "world/WorldSystem.h"
#include "runtime/systems/InputSystem.h"
#include "external/IIOController.h"
#include "external/IFSController.h"

namespace PEngine {
    Engine::Engine(IIOController *ioController, IFSController *fsController) {
        io = ioController;
        fs = fsController;
        systems.setEngine(this);
        systems.createSystem<InputSystem>();
    }

    WorldSystem &Engine::getWorld() {
        return world;
    }

    ResourcesSystem &Engine::getResources() {
        return resources;
    }

    void Engine::run() {
        systems.run();
    }

    IIOController *Engine::getIo() {
        return io;
    }

    IFSController *Engine::getFs() {
        return fs;
    }
}