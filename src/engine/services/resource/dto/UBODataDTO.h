#ifndef PROJECTION_UBODATADTO_H
#define PROJECTION_UBODATADTO_H

#include <string>
#include "../../../enum/UBOType.h"

namespace PEngine {
    struct UBODataDTO {
        std::string name;
        UBOType type;
        int offset;
        int chunkSize;
        int dataLength;
    };
}

#endif
