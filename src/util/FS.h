#ifndef PROJECTION_FS_H
#define PROJECTION_FS_H

#include <string>
#include <vector>

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class FS {
    private:
        static void HandleEvent(WebViewPayload &payload);
    public:
        static std::string SEP;

        static void WriteFile(const std::string &filePath, const std::string &data);

        static void DeleteFileOrDir(const std::string &filePath);

        static std::string GetCurrentPath();

        static std::string ReadFile(const std::string &filePath);

        static bool Exists(const std::string &path);

        static bool CreateDir(const std::string &path);

        static std::vector<std::string> ReadDirectory(const std::string &directoryPath);

        static std::string GetRootDir();

        static void BindEvents(WebViewWindow *pWindow);
    };
}

#endif
