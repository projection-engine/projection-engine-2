#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "JSON.h"

namespace PEngine::JSONTest {
    std::string jsonString = R"({"name":"John Doe","age":30,"city":"New York"})";
    std::string nullJson = R"({"null":null})";
    
    void parse() {
        JSON json = JSON::parse(jsonString);
        REQUIRE(json.has("name"));
    }

    void stringify() {
        JSON json = JSON::parse(jsonString);

        REQUIRE(json.stringify().length() == jsonString.length());
    }

    void deleteKey() {
        JSON json = JSON::parse(jsonString);
        REQUIRE(json.has("name"));
        json.erase("name");
        json.erase("doesntExist");
        REQUIRE(!json.has("name"));
        REQUIRE(!json.has("doesntExist"));
    }

    void getKey() {
        JSON json = JSON::parse(jsonString);
        JSON null = JSON::parse(nullJson);

        REQUIRE(null.has("null") == false);
        REQUIRE(json.has("name") == true);
        REQUIRE(json.get<std::string>("name", "") == "John Doe");
        REQUIRE(json.get<std::string>("doesntExist", "doesntExist") == "doesntExist");
    }

    void setKey() {
        JSON json = JSON::parse(jsonString);
        json.set("name", "Overridden");
        REQUIRE(json.get<std::string>("name", "") == "Overridden");
        json.set("newKey", "newKey");
        REQUIRE(json.get<std::string>("newKey", "") == "newKey");
    }

    void addArray() {
        JSON json{};
        json.pushItem("example");
        REQUIRE(json.stringify() == R"(["example"])");
    }

    Tester *createTester() {
        auto tester = new Tester("JSONTest");
        tester->registerTest("Should parse string", parse);
        tester->registerTest("Should get key", getKey);
        tester->registerTest("Should stringify", stringify);
        tester->registerTest("Should delete key", deleteKey);
        tester->registerTest("Should set key", setKey);
        tester->registerTest("Should add array", addArray);
        return tester;
    }
}
