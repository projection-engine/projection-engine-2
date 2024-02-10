#ifndef PROJECTION_RUNTIMESTATE_H
#define PROJECTION_RUNTIMESTATE_H

#include <cstdint>
#include <vector>

namespace PEngine {

    struct RuntimeState {
        int viewportWidth = 0;
        int viewportHeight = 0;
        long long int elapsed = 0;

        std::uint32_t lockedEntity;
        std::vector<std::uint32_t> selected;
    };

}

#endif
