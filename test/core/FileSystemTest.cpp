#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "../../src/services/FileSystemService.h"

namespace PEngine::FileSystemTest {

    void createDirectory() {
        std::string path = FileSystemService::GetCurrentPath() + "/example";
        FileSystemService::CreateDir(path);
        REQUIRE(FileSystemService::Exists(path) == true);
    }

    void createFile() {
        std::string path = FileSystemService::GetCurrentPath() + "/example/example.txt";
        FileSystemService::WriteFile(path, "example");
        REQUIRE(FileSystemService::Exists(path) == true);
    }

    void readFile() {
        std::string path = FileSystemService::GetCurrentPath() + "/example/example.txt";
        std::string content = FileSystemService::ReadFile(path);
        REQUIRE(!content.empty());
        REQUIRE(content == "example");
    }

    void deleteFile() {
        std::string dirPath = FileSystemService::GetCurrentPath() + "/example";
        std::string path = dirPath + "/example.txt";
        FileSystemService::DeleteFileOrDir(dirPath);
        REQUIRE(FileSystemService::Exists(dirPath) == false);
        REQUIRE(FileSystemService::Exists(path) == false);
    }

    Tester *createTester() {
        auto tester = new Tester("FileSystemTest");
        tester->registerTest("Should create directory", createDirectory);
        tester->registerTest("Should write file", createFile);
        tester->registerTest("Should read file", readFile);
        tester->registerTest("Should delete file", deleteFile);
        return tester;
    }
}
