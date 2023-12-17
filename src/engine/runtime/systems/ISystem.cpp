
#include "ISystem.h"
#include "../../resource/ResourcesSystem.h"
#include "../../world/WorldSystem.h"

namespace PEngine {

    void ISystem::run() {

    }

    bool ISystem::isEnabled() {
        return false;
    }

    void ISystem::initialize(ResourcesSystem *r, WorldSystem *w, IIOController *ioController,
                             IFSController *fsController) {
        if (initialized) {
            return;
        }
        initialized = true;
        fs = fsController;
        io = ioController;
        world = w;
        resources = r;
    }
}