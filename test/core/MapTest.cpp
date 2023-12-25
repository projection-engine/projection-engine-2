#include <catch2/catch_all.hpp>
#include "../../src/util/structures/Map.cpp"
#include "../Tester.h"

namespace PEngine::MapTest {


    void add() {
        Map<std::string, int> map;
        int value = 1;
        int value2 = 2;
        int value3 = 3;

        map.set("one", value);
        map.set("two", value2);
        map.set("three", value3);

        REQUIRE(map.getKeys().size() == 3);
        REQUIRE(map.get("two") == value2);
        REQUIRE(map.getSize() == 3);
    }

    void has() {
        Map<std::string, int> map;
        int value3 = 3;
        map.set("three", value3);
        REQUIRE(map.has("three") == true);
    }

    void hasNot() {
        Map<std::string, int> map;
        REQUIRE(map.has("three") == false);
    }

    void remove() {
        Map<std::string, int> map;
        int value = 1;
        int value2 = 2;
        int value3 = 3;

        map.set("one", value);
        map.set("two", value2);
        map.set("three", value3);

        REQUIRE(map.getKeys().size() == 3);
        map.deleteKey("two");
        REQUIRE(map.getKeys().size() == 2);
    }

    void get() {
        struct Test {
            int a;
        };
        Map<std::string, Test *> map;
        Test value = Test{1};
        map.set("instance", &value);

        REQUIRE(map.get("instance") == &value);
    }

    void getNullptr() {
        Map<std::string, int> map;
        REQUIRE(map.get("instance") == 0);
    }

    void removeNothing() {
        Map<std::string, int> map;
        map.deleteKey("instance");
        REQUIRE(map.getSize() == 0);
    }

    void mapClear() {
        Map<std::string, int> map;
        int value = 1;
        int value2 = 2;
        int value3 = 3;

        map.set("one", value);
        map.set("two", value2);
        map.set("three", value3);

        REQUIRE(map.getKeys().size() == 3);
        map.clear();
        REQUIRE(map.getKeys().empty());
        REQUIRE(map.get("one") == 0);
    }

    void mapKeys() {
        Map<const char *, int> map;
        int value = 1;
        int value2 = 2;
        int value3 = 3;
        bool existsKey1 = false;
        bool existsKey2 = false;
        bool existsKey3 = false;
        map.set("one", value);
        map.set("two", value2);
        map.set("three", value3);
        auto keys = map.getKeys();
        for (int i = 0; i < 3; i++) {
            if (strcmp(keys[i], "one") == 0) {
                existsKey1 = true;
            }
            if (strcmp(keys[i], "two") == 0) {
                existsKey2 = true;
            }
            if (strcmp(keys[i], "three") == 0) {
                existsKey3 = true;
            }
        }
        REQUIRE(existsKey1 == true);
        REQUIRE(existsKey2 == true);
        REQUIRE(existsKey3 == true);
    }

    Tester *createTester() {
        auto *tester = new Tester("MapTest");
        tester->registerTest("Should add elements", add);
        tester->registerTest("Should have key", has);
        tester->registerTest("Should not have key", hasNot);
        tester->registerTest("Should remove element", remove);
        tester->registerTest("Should have element", get);
        tester->registerTest("Should return nullptr", getNullptr);
        tester->registerTest("Should do nothing", removeNothing);
        tester->registerTest("Should clear", mapClear);
        tester->registerTest("Should return keys", mapKeys);
        return tester;
    }
}