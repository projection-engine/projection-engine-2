#ifndef PROJECTION_FILESYSTEMUTIL_H
#define PROJECTION_FILESYSTEMUTIL_H

#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <stdexcept>

namespace fs = std::filesystem;

namespace PEngine::FileSystemUtil {
    void WriteFile(const std::string &pathToFile, const char *data) {

    }

    void DeleteFile(const std::string &pathToFile) {

    }

    std::string GetCurrentPath() {
        return fs::current_path().string();
    }

    const char *ReadFile(const std::string &pathToFile) {
        std::ifstream file(pathToFile);

        if (!file.is_open()) {
            return nullptr;
        }

        std::string content;
        std::string line;

        while (std::getline(file, line)) {
            content += line + "\n";
        }

        file.close();

        return content.c_str();
    }

    bool Exists(const std::string &path) {
        return fs::exists(path);
    }

    bool CreateDirectory(const std::string &path) {
        if (!Exists(path)) {
            try {
                fs::create_directory(path);
                std::cout << "Directory created: " << path << std::endl;
                return true;
            } catch (const fs::filesystem_error &e) {
                std::cerr << "Error creating directory: " << e.what() << std::endl;
                return false;
            }
        } else {
            std::cout << "Directory already exists: " << path << std::endl;
            return true;
        }
    }
}

#endif
