#ifndef PROJECTION_ENGINE_H
#define PROJECTION_ENGINE_H

#include "services/WorldService.h"
#include "services/CameraService.h"
#include "services/WorldPhysicsService.h"
#include "services/ResourceService.h"
#include "services/SystemService.h"
#include "services/WorldLightsService.h"
#include "services/RuntimeState.h"

namespace PEngine {
    class AbstractIOService;

    class AbstractFSService;

    class Engine {
    private:
        RuntimeState state;
        WorldService world;
        WorldLightsService worldLights;
        ResourceService resources;
        CameraService camera;
        WorldPhysicsService worldPhysics;
        SystemService systems;
        AbstractIOService *io = nullptr;
        AbstractFSService *fs = nullptr;
    public:
        explicit Engine(int w, int h, AbstractIOService *ioController, AbstractFSService *fsController);

        WorldService *getWorldService();

        ResourceService *getResourceService();

        SystemService *getSystemService();

        WorldLightsService *getWorldLightsService();

        void run();

        RuntimeState &getState();

        AbstractIOService *getIo();

        AbstractFSService *getFs();

        WorldPhysicsService *getWorldPhysicsService();

        CameraService *getCameraService();

        int getViewportWidth() const;

        int getViewportHeight() const;

    };
}

#endif
