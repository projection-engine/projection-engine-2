#ifndef PROJECTION_ABSTRACTCORESERVICE_H
#define PROJECTION_ABSTRACTCORESERVICE_H

#include "../../util/debug/ILoggable.h"
#include "../AbstractSerializable.h"

namespace PEngine {
    class Engine;

    class AbstractCoreService : public AbstractSerializable {
    protected:
        Engine *engine = nullptr;
    public:
        void setEngine(Engine *eg);

        Engine *getEngine();
    };
}


#endif
