#ifndef PROJECTION_FSCONTROLLER_H
#define PROJECTION_FSCONTROLLER_H

#include "../../../engine/services/AbstractFSService.h"

namespace PEngine {

    class FSController : public AbstractFSService{
    public:
        std::string readFile(const std::string &path) override;
    };

}

#endif
