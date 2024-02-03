#ifndef PROJECTION_ABSTRACTCORESERVICE_H
#define PROJECTION_ABSTRACTCORESERVICE_H

#include "../../util/debug/ILoggable.h"

namespace PEngine {
    class Engine;

    class AbstractCoreService : public ILoggable {
    protected:
        Engine *engine;
    public:
        void setEngine(Engine *eg);

        Engine *getEngine();
    };
}


#endif
