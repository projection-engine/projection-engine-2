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
        auto end = std::chrono::high_resolution_clock::now();
        long long endC = std::chrono::time_point_cast<std::chrono::microseconds>(end).time_since_epoch().count();
        elapsed = endC - elapsed;

        systems.run();
    }

    Engine::Engine(int w, int h, AbstractIOService *ioController, AbstractFSService *fsController) {
        width = w;
        height = h;

        io = ioController;
        fs = fsController;

        systems.setEngine(this);
        world.setEngine(this);
        resources.setEngine(this);
        worldLights.setEngine(this);

        resources.initialize();
        systems.initialize();
    }

    AbstractIOService *Engine::getIo() const {
        return io;
    }

    AbstractFSService *Engine::getFs() const {
        return fs;
    }

    int Engine::getViewportWidth() const {
        return width;
    }

    int Engine::getViewportHeight() const {
        return height;
    }
}