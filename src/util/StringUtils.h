#ifndef PROJECTION_STRINGUTILS_H
#define PROJECTION_STRINGUTILS_H

#include <string>

namespace PEngine::StringUtils {
    static void replace(std::string &str, const std::string &from, const std::string &to) {
        size_t start_pos = str.find(from);
        if (start_pos == std::string::npos) {
            return;
        }
        str.replace(start_pos, from.length(), to);
    }
}

#endif
