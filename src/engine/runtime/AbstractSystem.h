#ifndef PROJECTION_ABSTRACTSYSTEM_H
#define PROJECTION_ABSTRACTSYSTEM_H

#include "debug/ILoggable.h"

namespace PEngine {
    class ResourceService;

    class Engine;

    class WorldService;

    class AbstractIOService;

    class WorldPhysicsService;

    class WorldLightsService;

    class CameraService;

    class AbstractFSService;

    class AbstractSystem : public ILoggable {
    private:
        AbstractSystem *nextSystem;
    protected:
        WorldPhysicsService *worldPhysics;
        CameraService *camera;
        WorldLightsService *worldLights;
        ResourceService *resources;
        WorldService *world;
        Engine *engine;
        AbstractIOService *io;
        AbstractFSService *fs;
        bool enabled = true;
    public:

        void initialize(Engine *eng);

        virtual void run();

        virtual bool shouldExecute();

        const bool isEnabled() const;

        void setIsEnabled(bool isEnabled);

        AbstractSystem *getNext();

        void setNext(AbstractSystem *system);

    };

}

#endif
