#ifndef PROJECTION_FILESYSTEMSERVICE_H
#define PROJECTION_FILESYSTEMSERVICE_H

#include <string>
#include <vector>
#include "AbstractService.h"

namespace PEngine {

    class FileSystemService : public AbstractService {
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

        static std::string ReadDirectory(const std::string &directoryPath);

        static std::string GetRootDir();

        void BindEvents(WebViewWindow *pWindow) override;
    };
}

#endif
