#include "Timer.h"
#include "../structures/Map.cpp"

namespace PEngine {
    Map<const char *, long long> Timer::state;

    void Timer::finish() {
        auto end = std::chrono::high_resolution_clock::now();
        auto startC = std::chrono::time_point_cast<std::chrono::microseconds>(start).time_since_epoch().count();
        auto endC = std::chrono::time_point_cast<std::chrono::microseconds>(end).time_since_epoch().count();
        state.set(name, endC - startC);
    }

    Map<const char *, long long> *Timer::getState() {
        return &state;
    }

} // Catalyst