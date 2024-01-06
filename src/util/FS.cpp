#include "FS.h"
#include <iostream>
#include <fstream>
#include <filesystem>
#include <stdexcept>

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
}