#ifndef PROJECTION_ENGINE_H
#define PROJECTION_ENGINE_H

#include "services/WorldService.h"
#include "services/CameraService.h"
#include "services/WorldPhysicsService.h"
#include "services/ResourceService.h"
#include "services/SystemService.h"
#include "services/WorldLightsService.h"

namespace PEngine {
    class AbstractIOService;

    class AbstractFSService;

    class Engine {
    private:
        WorldService world;
        WorldLightsService worldLights;
        ResourceService resources;
        CameraService camera;
        WorldPhysicsService worldPhysics;
        SystemService systems;
        AbstractIOService *io = nullptr;
        AbstractFSService *fs = nullptr;
    public:
        explicit Engine(AbstractIOService *ioController, AbstractFSService *fsController);

        WorldService *getWorldService();

        ResourceService *getResourceService();

        SystemService *getSystemService();

        WorldLightsService *getWorldLightsService();

        void run();

        AbstractIOService *getIo() const;

        AbstractFSService *getFs() const;

        WorldPhysicsService *getWorldPhysicsService();

        CameraService *getCameraService();
    };
}

#endif
