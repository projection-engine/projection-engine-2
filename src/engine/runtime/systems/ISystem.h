#ifndef PROJECTION_ISYSTEM_H
#define PROJECTION_ISYSTEM_H

#include "../../../core/debug/ILoggable.h"

namespace PEngine {
    class ResourcesSystem;

    class WorldSystem;

    class IIOController;

    class IFSController;

    class ISystem : public ILoggable {
    private:
        bool initialized = false;
    protected:
        ResourcesSystem *resources = nullptr;
        WorldSystem *world = nullptr;
        IIOController *io = nullptr;
        IFSController *fs = nullptr;
    public:
        virtual void run();

        virtual bool isEnabled();

        void initialize(ResourcesSystem *r, WorldSystem *w, IIOController *ioController, IFSController *fsController);
    };

}

#endif
