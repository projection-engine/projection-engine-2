#ifndef PROJECTION_UBODATADTO_H
#define PROJECTION_UBODATADTO_H

#include <string>
#include <utility>
#include "../../../enum/UBOType.h"

namespace PEngine {
    struct UBODataDTO {
        std::string name;
        UBOType type;
        int offset = 0;
        int chunkSize = 0;
        int dataLength = 0;

        UBODataDTO(std::string name, UBOType type) : name(std::move(name)), type(type) {}

        UBODataDTO(std::string name, UBOType type, int dataLength) : name(std::move(name)), type(type),
                                                                            dataLength(dataLength) {}
    };
}

#endif
