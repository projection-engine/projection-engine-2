#include <stdexcept>
#include "AbstractSerializable.h"

namespace PEngine {
    AbstractSerializable AbstractSerializable::getNew() {
        throw std::invalid_argument("Method not implemented");
    }

    nlohmann::json AbstractSerializable::serialize() {
        throw std::invalid_argument("Method not implemented");

    }

    void AbstractSerializable::parse(nlohmann::json &data) {
        throw std::invalid_argument("Method not implemented");
    }
}
