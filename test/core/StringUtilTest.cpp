#include <catch2/catch_all.hpp>
#include "../../src/util/structures/Map.cpp"
#include "../../src/util/StringUtils.h"
#include "../Tester.h"

namespace PEngine::StringUtilTest {

    void matches() {
        std::string part = "#include \"something\"";
        std::string text = "ABC\n" + part;
        const std::vector<std::string> &vector = StringUtils::Matches(text, "#include");
        REQUIRE(vector.size() == 1);
        REQUIRE(vector[0] == part);
    }

    Tester *createTester() {
        auto *tester = new Tester("StringUtilTest");
        tester->registerTest("Should find matches", matches);
        return tester;
    }
}