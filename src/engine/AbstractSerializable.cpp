#include <stdexcept>
#include "AbstractSerializable.h"

namespace PEngine {
    AbstractSerializable AbstractSerializable::getNew() {
        throw std::invalid_argument("Method not implemented");
    }

    nlohmann::json AbstractSerializable::serialize() {
        return nlohmann::json();
    }

    void AbstractSerializable::parse(nlohmann::json &data) {

    }
}
