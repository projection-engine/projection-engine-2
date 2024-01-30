#include "CameraTrackerSystem.h"
#include "../external/AbstractIOService.h"
#include "event/EventController.h"

#define MOUSE_0 0
#define MOUSE_1 1
#define MOUSE_2 2

namespace PEngine {
    void CameraTrackerSystem::run() {
        if (io->isMouseButtonDown(MOUSE_0)) {
            EventController::get()->triggerEvent("mousedown");
        }
    }

    bool CameraTrackerSystem::shouldExecute() {
        return true;
    }
}