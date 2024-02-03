#ifndef PROJECTION_CAMERATRACKERSYSTEM_H
#define PROJECTION_CAMERATRACKERSYSTEM_H

#include "AbstractSystem.h"

namespace PEngine {

    class CameraTrackerSystem : public AbstractSystem {
    public:
        bool shouldExecute() override;

        void run() override;
    };

}

#endif
