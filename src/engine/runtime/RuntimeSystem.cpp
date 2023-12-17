#include "RuntimeSystem.h"
#include "../Engine.h"

namespace PEngine {
    void RuntimeSystem::run() {
        size_t size = systems.size();
        for (int i = 0; i < size; i++) {
            ISystem *&pSystem = systems[i];
            if (pSystem->isEnabled()) { pSystem->run(); }
        }
    }

    void RuntimeSystem::setEngine(Engine *eg) {
        if (engine != nullptr) return;
        engine = eg;
    }

    void RuntimeSystem::registerSystem(ISystem *system) {
        system->initialize(&engine->getResources(), &engine->getWorld(), engine->getIo(), engine->getFs());
        systems.push_back(system);
    }
}