#include "entt/entt.hpp"
#include "../Tester.h"
#include "catch2/catch_test_macros.hpp"
#include "../../src/engine/AbstractSerializable.h"
#include "Sample.h"

namespace PEngine::SerializationTest {

    void shouldSerializeComponent() {
        Sample sample;
        Sample sampleRestored;
        float value = 3.f;
        sample.vector.z = sample.vector.y = sample.vector.x = value;
        sample.matrix[0][0] = sample.matrix[1][1] = sample.matrix[2][2] = sample.matrix[3][3] = value;

        nlohmann::json json = sample.serialize();
        sampleRestored.parse(json);

        REQUIRE(json["vector"][0] == value);
        REQUIRE(json["vector"][2] == value);
        REQUIRE(json["vector"][1] == value);

        REQUIRE(sampleRestored.vector.x == value);
        REQUIRE(sampleRestored.vector.y == value);
        REQUIRE(sampleRestored.vector.z == value);

        REQUIRE(sample.matrix[0][0] == value);
        REQUIRE(sample.matrix[1][1] == value);
        REQUIRE(sample.matrix[2][2] == value);
        REQUIRE(sample.matrix[3][3] == value);
    }

    Tester *createTester() {
        auto tester = new Tester("SerializationTest");
        tester->registerTest("Should have component", shouldSerializeComponent);
        return tester;
    }

}
