#include "entt/entt.hpp"
#include "../Tester.h"
#include "../../src/engine/services/world/components/MovementComponent.h"
#include "catch2/catch_test_macros.hpp"

namespace PEngine::SerializationTest {
    void shouldSerializeComponent() {
        MovementComponent sample;
        MovementComponent sampleRestored;
        float value = 3.f;
        sample.pivotPoint.z = sample.pivotPoint.y = sample.pivotPoint.x = value;
        sample.matrix[0][0] = sample.matrix[1][1] = sample.matrix[2][2] = sample.matrix[3][3] = value;

        nlohmann::json json = sample.serialize();
        sampleRestored.parse(json);

        REQUIRE(json["pivotPoint"]["x"] == value);
        REQUIRE(json["pivotPoint"]["z"] == value);
        REQUIRE(json["pivotPoint"]["y"] == value);

        REQUIRE(sampleRestored.pivotPoint.x == value);
        REQUIRE(sampleRestored.pivotPoint.y == value);
        REQUIRE(sampleRestored.pivotPoint.z == value);

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
