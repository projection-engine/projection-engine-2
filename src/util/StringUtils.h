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

    static std::vector<std::string> Matches(const std::string &input, const std::string &searchString) {
        std::vector<std::string> includes;
        size_t pos = 0;
        while ((pos = input.find(searchString, pos)) != std::string::npos) {
            size_t endPos = input.find_first_of('\n', pos);
            if (endPos == std::string::npos)
                endPos = input.size();
            std::string include = input.substr(pos, endPos - pos);
            includes.push_back(include);
            pos = endPos;
        }

        return includes;
    }
}

#endif
