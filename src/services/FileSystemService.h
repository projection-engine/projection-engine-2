#ifndef PROJECTION_FILESYSTEMSERVICE_H
#define PROJECTION_FILESYSTEMSERVICE_H

#include <string>
#include <vector>
#include "../ui/AbstractService.h"

namespace PEngine {
    class WebViewPayload;

    class WebViewWindow;

    class FileSystemService : public AbstractService {
    private:
        static void HandleEvent(WebViewPayload &payload);

        static void BindEvents(WebViewWindow &pWindow);

    public:
        void bindEvents(PEngine::WebViewWindow &webView) override {
            BindEvents(webView);
        }

        static std::string SEP;

        static void WriteFile(const std::string &filePath, const std::string &data);

        static void DeleteFileOrDir(const std::string &filePath);

        static std::string GetCurrentPath();

        static std::string ReadFile(const std::string &filePath);

        static bool Exists(const std::string &path);

        static bool CreateDir(const std::string &path);

        static std::string ReadDirectory(const std::string &directoryPath);

        static std::string GetRootDir();

    };
}

#endif
