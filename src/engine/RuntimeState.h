#ifndef PROJECTION_RUNTIMESTATE_H
#define PROJECTION_RUNTIMESTATE_H

#include <cstdint>
#include <vector>
#include "AbstractSerializable.h"

namespace PEngine {

    struct RuntimeState : public AbstractSerializable {
        int viewportWidth = 0;
        int viewportHeight = 0;
        long long int elapsed = 0;

        std::uint32_t lockedEntity;
        std::vector<std::uint32_t> selected;
    };

}

#endif
