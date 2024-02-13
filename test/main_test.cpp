#include "catch2/catch_all.hpp"
#include "engine/WorldServiceTest.h"
#include "Tester.h"
#include "core/LoggerTest.h"
#include "core/ListTest.h"
#include "core/MapTest.h"
#include "ui/event/EventControllerTest.h"
#include "ui/store/IStoreTest.h"
#include "core/FileSystemTest.h"
#include "core/StringUtilTest.h"
#include "engine/SerializationTest.h"

void run(int ind, bool all) {
    if (ind == 0 || all) {
        Tester *tester = PEngine::EngineTest::createTester();
        tester->run();
    }
    if (ind == 1 || all) {
        Tester *tester = PEngine::LoggerTest::createTester();
        tester->run();
    }
    if (ind == 2 || all) {
        Tester *tester = PEngine::ListTest::createTester();
        tester->run();
    }
    if (ind == 3 || all) {
        Tester *tester = PEngine::MapTest::createTester();
        tester->run();
    }

    if (ind == 4 || all) {
        Tester *tester = PEngine::EventControllerTest::createTester();
        tester->run();
    }
    if (ind == 5 || all) {
        Tester *tester = PEngine::IStoreTest::createTester();
        tester->run();
    }

    if (ind == 6 || all) {
        Tester *tester = PEngine::FileSystemTest::createTester();
        tester->run();
    }

    if (ind == 7 || all) {
        Tester *tester = PEngine::StringUtilTest::createTester();
        tester->run();
    }

    if (ind == 8 || all) {
        Tester *tester = PEngine::SerializationTest::createTester();
        tester->run();
    }
}

TEST_CASE("Engine test", "[engine-test]") {
    run(0, false);
}

TEST_CASE("Logger test", "[logger-test]") {
    run(1, false);
}

TEST_CASE("List test", "[list-test]") {
    run(2, false);
}

TEST_CASE("Map test", "[map-test]") {
    run(3, false);
}

TEST_CASE("EventController test", "[event-controller-test]") {
    run(4, false);
}

TEST_CASE("IStore test", "[istore-test]") {
    run(5, false);
}

TEST_CASE("File-system test", "[fs-test]") {
    run(6, false);
}

TEST_CASE("String util test", "[stringutil-test]") {
    run(7, false);
}

TEST_CASE("Serialization test", "[serialization-test]") {
    run(8, false);
}

TEST_CASE("Run all", "[RUN_ALL]") {
    run(-1, true);
}
