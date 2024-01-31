#include "SystemService.h"
#include "../Engine.h"
#include "../runtime/AbstractSystem.h"
#include "../runtime/CameraSystem.h"
#include "../runtime/CameraTrackerSystem.h"

namespace PEngine {

    void SystemService::initialize() {
        createSystem<CameraTrackerSystem>();
        createSystem<CameraSystem>();
    }

    void SystemService::run() {
        AbstractSystem *current = rootSystem;
        while (current != nullptr) {
            if (current->shouldExecute()) {
                current->run();
            }
            current = current->getNext();
        }
    }

    void SystemService::registerSystem(AbstractSystem *system) {
        system->initialize(engine);
        if (rootSystem == nullptr) {
            CONSOLE_LOG("REGISTERING ROOT SYSTEM")
            rootSystem = system;
        } else {
            AbstractSystem *current = rootSystem;
            while (current != nullptr) {
                if (current->getNext() == nullptr) {
                    CONSOLE_LOG("REGISTERING NEXT SYSTEM {0} -> {1}", typeid(current).name(), typeid(system).name())
                    current->setNext(system);
                    break;
                }
                current = current->getNext();
            }
        }
    }

    AbstractSystem *SystemService::findSystemInternal(const char *name) {
        AbstractSystem *current = rootSystem;
        while (current != nullptr) {
            if (strcmp(typeid(current).name(), name) == 0) {
                return current;
            }
            current = current->getNext();
        }
        return nullptr;
    }
}