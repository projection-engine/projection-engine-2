
#include "UUID.h"

namespace PEngine {
    std::random_device              UUID::rd;
    std::mt19937                    UUID::gen(rd());
    std::uniform_int_distribution<> UUID::dis(0, 15);
    std::uniform_int_distribution<> UUID::dis2(8, 11);

    std::string UUID::v4() {
        std::stringstream ss;
        int i;
        ss << std::hex;
        for (i = 0; i < 8; i++) {
            ss << dis(gen);
        }
        ss << "-";
        for (i = 0; i < 4; i++) {
            ss << dis(gen);
        }
        ss << "-4";
        for (i = 0; i < 3; i++) {
            ss << dis(gen);
        }
        ss << "-";
        ss << dis2(gen);
        for (i = 0; i < 3; i++) {
            ss << dis(gen);
        }
        ss << "-";
        for (i = 0; i < 12; i++) {
            ss << dis(gen);
        }
        return ss.str();
    }
}