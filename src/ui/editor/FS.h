#ifndef PROJECTION_FS_H
#define PROJECTION_FS_H

#include <string>
#include "../../engine/services/AbstractFSService.h"

namespace PEngine {

    class FS : public AbstractFSService{
    public:
        std::string readFile(const std::string &path) override;
    };

}

#endif
