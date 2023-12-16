#ifndef CATALYST_STRINGUTILS_H
#define CATALYST_STRINGUTILS_H

#include <string>

namespace PEngine {

    class StringUtils {
    public:
        static void replace(std::string &str, const std::string &from, const std::string &to);
    };

}

#endif
