#include "Engine.h"

namespace PEngine {
    WorldService *Engine::getWorldService() {
        return &world;
    }

    ResourceService *Engine::getResourceService() {
        return &resources;
    }

    SystemService *Engine::getSystemService() {
        return &systems;
    }

    WorldLightsService *Engine::getWorldLightsService() {
        return &worldLights;
    }

    CameraService *Engine::getCameraService() {
        return &camera;
    }

    WorldPhysicsService *Engine::getWorldPhysicsService() {
        return &worldPhysics;
    }


    void Engine::run() {
        systems.run();
    }

    Engine::Engine(AbstractIOService *ioService, AbstractFSService *fsService) {
        io = ioService;
        fs = fsService;

        systems.setEngine(this);
        world.setEngine(this);
        resources.setEngine(this);
        worldLights.setEngine(this);

        systems.initialize();
    }

    AbstractIOService *Engine::getIo() const {
        return io;
    }

    AbstractFSService *Engine::getFs() const {
        return fs;
    }
}