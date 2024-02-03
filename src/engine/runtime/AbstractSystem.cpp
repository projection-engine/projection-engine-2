
#include "AbstractSystem.h"
#include "../services/ResourceService.h"
#include "../services/WorldService.h"
#include "../Engine.h"

namespace PEngine {

    void AbstractSystem::run() {

    }

    bool AbstractSystem::shouldExecute() {
        return false;
    }

    const bool AbstractSystem::isEnabled() const {
        return enabled;
    }

    void AbstractSystem::setIsEnabled(bool isEnabled) {
        AbstractSystem::enabled = isEnabled;
    }

    AbstractSystem *AbstractSystem::getNext() {
        return nextSystem;
    }

    void AbstractSystem::setNext(AbstractSystem *system) {
        nextSystem = system;
    }

    void AbstractSystem::initialize(Engine *eng) {
        world = eng->getWorldService();
        resources = eng->getResourceService();
        worldLights = eng->getWorldLightsService();
        worldPhysics = eng->getWorldPhysicsService();
        camera = eng->getCameraService();
        engine = eng;
        fs = eng->getFs();
        io = eng->getIo();
    }
}