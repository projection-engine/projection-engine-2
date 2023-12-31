#ifndef PROJECTION_PROJECTSSERVICE_H
#define PROJECTION_PROJECTSSERVICE_H

#include <string>

namespace PEngine {
    class WebViewPayload;

    class ProjectsService {
    public:
        static void reload(WebViewPayload &payload);

        static void createProject(WebViewPayload &payload);

        static void readProjectsCache(WebViewPayload &payload);

        static void addToCache(const std::basic_string<char, std::char_traits<char>, std::allocator<char>> &path,
                               const std::basic_string<char, std::char_traits<char>, std::allocator<char>> &name,
                               const std::basic_string<char, std::char_traits<char>, std::allocator<char>> &id);
    };

}

#endif
