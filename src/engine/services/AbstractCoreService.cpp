#include "AbstractCoreService.h"

void PEngine::AbstractCoreService::setEngine(PEngine::Engine *eg) {
    engine = eg;
}

PEngine::Engine *PEngine::AbstractCoreService::getEngine() {
    return engine;
}
