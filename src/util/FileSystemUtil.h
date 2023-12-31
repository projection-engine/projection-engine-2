#ifndef PROJECTION_FILESYSTEMUTIL_H
#define PROJECTION_FILESYSTEMUTIL_H

#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <stdexcept>

namespace fs = std::filesystem;

namespace PEngine::FileSystemUtil {
    void WriteFile(const std::string &filePath, const std::string &data) {
        std::ofstream outputFile(filePath);
        if (outputFile.is_open()) {
            outputFile << data;
            outputFile.close();
            std::cout << "Data successfully written to file: " << filePath << std::endl;
        } else {
            std::cerr << "Error: Unable to open file for writing: " << filePath << std::endl;
        }
    }

    void DeleteFileOrDir(const std::string &filePath) {
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

    std::string GetCurrentPath() {
        return fs::current_path().string();
    }

    std::string ReadFile(const std::string &filePath) {
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
