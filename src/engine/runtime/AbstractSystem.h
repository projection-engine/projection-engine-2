#ifndef PROJECTION_ABSTRACTSYSTEM_H
#define PROJECTION_ABSTRACTSYSTEM_H


#include "../../util/debug/ILoggable.h"

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
        AbstractSystem *nextSystem = nullptr;
    protected:
        WorldPhysicsService *worldPhysics = nullptr;
        CameraService *camera = nullptr;
        WorldLightsService *worldLights = nullptr;
        ResourceService *resources = nullptr;
        WorldService *world = nullptr;
        Engine *engine = nullptr;
        AbstractIOService *io = nullptr;
        AbstractFSService *fs = nullptr;
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
