#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "FS.h"

namespace PEngine::FileSystemTest {

    void createDirectory() {
        std::string path = FS::GetCurrentPath() + "/example";
        FS::CreateDir(path);
        REQUIRE(FS::Exists(path) == true);
    }

    void createFile() {
        std::string path = FS::GetCurrentPath() + "/example/example.txt";
        FS::WriteFile(path, "example");
        REQUIRE(FS::Exists(path) == true);
    }

    void readFile() {
        std::string path = FS::GetCurrentPath() + "/example/example.txt";
        std::string content = FS::ReadFile(path);
        REQUIRE(!content.empty());
        REQUIRE(content == "example");
    }

    void deleteFile() {
        std::string dirPath = FS::GetCurrentPath() + "/example";
        std::string path = dirPath + "/example.txt";
        FS::DeleteFileOrDir(dirPath);
        REQUIRE(FS::Exists(dirPath) == false);
        REQUIRE(FS::Exists(path) == false);
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
