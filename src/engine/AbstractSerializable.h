#ifndef PROJECTION_ABSTRACTSERIALIZABLE_H
#define PROJECTION_ABSTRACTSERIALIZABLE_H

#include "nlohmann/json.hpp"
#include "../util/debug/ILoggable.h"

namespace PEngine {

    class AbstractSerializable : public ILoggable {
    public:
        virtual AbstractSerializable getNew();

        virtual nlohmann::json serialize();

        virtual void parse(nlohmann::json &data);
    };

}

#endif
