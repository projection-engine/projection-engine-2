#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "../../src/util/structures/List.h"
#include "FileSystemUtil.h"

namespace PEngine::FileSystemTest {

    void createDirectory() {
        FileSystemUtil::CreateDirectory("/example");
        FileSystemUtil::Exists("/example");
    }

    
    Tester *createTester() {
        auto tester = new Tester("FileSystemTest");
        tester->registerTest("Should create directory", createDirectory);
        return tester;
    }
}
