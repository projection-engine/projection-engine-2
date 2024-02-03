#include <catch2/catch_test_macros.hpp>
#include "entt/entt.hpp"
#include "../../src/engine/services/WorldService.h"
#include "../../src/engine/Engine.h"
#include "../Tester.h"
#include "../../src/engine/world/components/MovementComponent.h"

namespace PEngine::EngineTest {
    static Engine engine(nullptr, nullptr);


    void shouldAddEntity() {
        Entity *entity = engine.getWorld().addEntity();
        Entity *entityWithName = engine.getWorld().addEntity("Name");
        REQUIRE(engine.getWorld().hasEntity(entity->getUUID()) == true);
        REQUIRE(engine.getWorld().hasEntity(entityWithName->getUUID()) == true);
        REQUIRE(entityWithName->getName() == "Name");
    }

    void shouldRemoveEntity() {
        Entity *entity = engine.getWorld().addEntity();
        std::string uuid = entity->getUUID();
        engine.getWorld().removeEntity(uuid);
        REQUIRE(engine.getWorld().hasEntity(uuid) == false);
    }


    void shouldAddComponent() {
        Entity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<MovementComponent>(entity);
        AbstractComponent *component = engine.getWorld().getComponent<MovementComponent>(entity);

        REQUIRE(component != nullptr);
    }

    void shouldRemoveComponent() {
        Entity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<MovementComponent>(entity);
        engine.getWorld().removeComponent<MovementComponent>(entity);

        bool found = false;
        auto v = engine.getWorld().getRegistry().view<MovementComponent>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(engine.getWorld().hasComponent<MovementComponent>(entity) == false);
        REQUIRE(found == false);
    }

    void shouldHaveComponent() {
        Entity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<MovementComponent>(entity);

        bool found = false;
        auto v = engine.getWorld().getRegistry().view<MovementComponent>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(engine.getWorld().hasComponent<MovementComponent>(entity) == true);
        REQUIRE(found == true);
    }


    Tester *createTester() {
        auto tester = new Tester("EngineTest");
        tester->registerTest("Should add entity", shouldAddEntity);
        tester->registerTest("Should remove entity", shouldRemoveEntity);
        tester->registerTest("Should add component", shouldAddComponent);
        tester->registerTest("Should remove component", shouldRemoveComponent);
        tester->registerTest("Should have component", shouldHaveComponent);
        return tester;
    }

}