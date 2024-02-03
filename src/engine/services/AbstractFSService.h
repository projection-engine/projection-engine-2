#ifndef PROJECTION_ABSTRACTFSSERVICE_H
#define PROJECTION_ABSTRACTFSSERVICE_H

#include <string>
#include <stdexcept>

namespace PEngine {
    class AbstractFSService {

    public:
        virtual std::string readFile(const std::string &path) {
            throw std::runtime_error("Method not implemented");
        }
    };
}
#endif
