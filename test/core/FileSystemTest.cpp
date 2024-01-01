#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "FileSystemUtil.h"

namespace PEngine::FileSystemTest {

    void createDirectory() {
        std::string path = FileSystemUtil::GetCurrentPath() + "/example";
        FileSystemUtil::CreateDirectory(path);
        REQUIRE(FileSystemUtil::Exists(path) == true);
    }

    void createFile() {
        std::string path = FileSystemUtil::GetCurrentPath() + "/example/example.txt";
        FileSystemUtil::WriteFile(path, "example");
        REQUIRE(FileSystemUtil::Exists(path) == true);
    }

    void readFile() {
        std::string path = FileSystemUtil::GetCurrentPath() + "/example/example.txt";
        std::string content = FileSystemUtil::ReadFile(path);
        std::cout << content;
        REQUIRE(!content.empty());
        REQUIRE(content == "example");
    }

    void deleteFile() {
        std::string dirPath = FileSystemUtil::GetCurrentPath() + "/example";
        std::string path = dirPath + "/example.txt";
        FileSystemUtil::DeleteFileOrDir(dirPath);
        REQUIRE(FileSystemUtil::Exists(dirPath) == false);
        REQUIRE(FileSystemUtil::Exists(path) == false);
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
