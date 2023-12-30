#ifndef PROJECTION_FILESYSTEMUTIL_H
#define PROJECTION_FILESYSTEMUTIL_H

#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <stdexcept>

namespace PEngine::FileSystemUtil {
    void WriteFile(const std::string& pathToFile, const char *data) {

    }

    void DeleteFile(const std::string& pathToFile) {

    }

    std::string GetCurrentPath(){
        return std::filesystem::current_path().string();
    }

    const char *ReadFile(const std::string& pathToFile) {
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
}

#endif
