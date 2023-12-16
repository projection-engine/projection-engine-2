#ifndef CATALYST_UBODATADTO_H
#define CATALYST_UBODATADTO_H

#include <string>
#include "../UBOType.h"

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
