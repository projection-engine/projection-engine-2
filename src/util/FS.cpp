#include "FS.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <stdexcept>
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "JSON.h"
#include "StringUtils.h"

#define GET_ROOT_DIRECTORY  "GET_ROOT_DIRECTORY"
#define GET_SEPARATOR  "GET_SEPARATOR"
#define READ_DIRECTORY  "READ_DIRECTORY"


namespace PEngine {
    std::string FS::SEP = "\\";

    void FS::WriteFile(const std::string &filePath, const std::string &data) {
        std::ofstream outputFile(filePath);
        if (outputFile.is_open()) {
            outputFile << data;
            outputFile.close();
            std::cout << "Data successfully written to file: " << filePath << std::endl;
        } else {
            std::cerr << "Error: Unable to open file for writing: " << filePath << std::endl;
        }
    }

    void FS::DeleteFileOrDir(const std::string &filePath) {
        if (std::filesystem::exists(filePath)) {
            try {
                std::filesystem::remove_all(filePath);
                std::cout << "File successfully deleted: " << filePath << std::endl;
            } catch (const std::exception &e) {
                std::cerr << "Error: " << e.what() << std::endl;
            }
        } else {
            std::cerr << "Error: File not found: " << filePath << std::endl;
        }
    }

    std::string FS::GetCurrentPath() {
        return std::filesystem::current_path().string();
    }

    std::string FS::ReadFile(const std::string &filePath) {
        if (std::filesystem::exists(filePath)) {
            std::ifstream file(filePath);
            if (!file.is_open()) {
                std::cerr << "Error: Unable to open file " << filePath << std::endl;
                return "";
            }
            std::stringstream buffer;
            buffer << file.rdbuf();
            file.close();
            return buffer.str();
        } else {
            std::cerr << "Error: File not found: " << filePath << std::endl;
            return "";
        }
    }

    bool FS::Exists(const std::string &path) {
        return std::filesystem::exists(path);
    }

    bool FS::CreateDir(const std::string &path) {
        if (!Exists(path)) {
            try {
                std::filesystem::create_directory(path);
                std::cout << "Directory created: " << path << std::endl;
                return true;
            } catch (const std::filesystem::filesystem_error &e) {
                std::cerr << "Error creating directory: " << e.what() << std::endl;
                return false;
            }
        } else {
            std::cout << "Directory already exists: " << path << std::endl;
            return true;
        }
    }

    std::vector<std::string> FS::ReadDirectory(const std::string &directoryPath) {
        std::vector<std::string> paths;
        try {
            for (const auto &entry: std::filesystem::directory_iterator(directoryPath)) {
                paths.push_back(entry.path().string());
            }
        } catch (const std::filesystem::filesystem_error &e) {
            std::cerr << "Error while reading directory: " << e.what() << std::endl;
        }

        return paths;
    }

    std::string FS::GetRootDir() {
        try {
            const char *homePath = std::getenv("HOME");

            if (homePath == nullptr) {
                homePath = std::getenv("HOMEPATH");
            }
            const std::filesystem::path &root = std::filesystem::current_path().root_path();
            std::string pathToRoot =
                    root.string() + std::filesystem::path(homePath).string();
            StringUtils::replace(pathToRoot, SEP + SEP, SEP);
            return pathToRoot;
        } catch (const std::exception &ex) {
            std::cerr << "Error getting user root directory: " << ex.what() << std::endl;
            return "";
        }
    }

    void FS::HandleEvent(WebViewPayload &payload) {
        payload.webview->getLogger()->info("HANDLING FS EVENT");
        if (payload.id == GET_ROOT_DIRECTORY) {
            const std::string &dirPath = GetRootDir();
            payload.webview->getLogger()->info("ROOT DIR PATH {0}: ", dirPath);
            payload.resolve(dirPath);
        } else if (payload.id == GET_SEPARATOR) {
            payload.webview->getLogger()->info("SEPARATOR: {0}: ", SEP);
            payload.resolve(SEP);
        } else if (payload.id == READ_DIRECTORY) {
            payload.webview->getLogger()->info("READING DIR {0}", payload.payload);
            JSON json;
            for (const auto &path: ReadDirectory(payload.payload)) {
                json.pushItem(path);
            }
            payload.resolve(json.stringify());
        }
    }

    void FS::BindEvents(WebViewWindow *pWindow) {
        pWindow->addMessageListener(GET_ROOT_DIRECTORY, HandleEvent);
        pWindow->addMessageListener(GET_SEPARATOR, HandleEvent);
        pWindow->addMessageListener(READ_DIRECTORY, HandleEvent);
    }
}