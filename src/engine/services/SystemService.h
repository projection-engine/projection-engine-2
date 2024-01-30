#ifndef PROJECTION_SYSTEMSERVICE_H
#define PROJECTION_SYSTEMSERVICE_H

#include <vector>
#include "../../util/structures/List.h"
#include "AbstractCoreService.h"

namespace PEngine {
    class Engine;

    class AbstractSystem;

    class SystemService : public AbstractCoreService {
    private:
        AbstractSystem * rootSystem = nullptr;

        void registerSystem(AbstractSystem *system);

    public:

        void initialize();

        template<class T>
        void createSystem() {
            auto *pSystem = (AbstractSystem *) new T;
            registerSystem(pSystem);
        }

        AbstractSystem *findSystemInternal(const char *name);

        template<class T>
        AbstractSystem *getSystem() {
            return findSystemInternal(typeid(T).name());
        }

        void run();
    };

}

#endif
