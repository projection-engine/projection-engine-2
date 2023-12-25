#ifndef PROJECTION_RUNTIMESYSTEM_H
#define PROJECTION_RUNTIMESYSTEM_H

#include <vector>
#include "systems/ISystem.h"
#include "../../util/structures/List.h"

namespace PEngine {
    class Engine;

    class RuntimeSystem {
    private:
        Engine *engine = nullptr;
        std::vector<ISystem *> systems;

        void registerSystem(ISystem *system);

    public:

        void setEngine(Engine *eg);

        template<class T>
        void createSystem() {
            auto *pSystem = (ISystem *) new T;
            registerSystem(pSystem);
        }

        void run();
    };

}

#endif
