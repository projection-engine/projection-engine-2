#include <catch2/catch_test_macros.hpp>
#include "entt/entt.hpp"
#include "../../src/engine/services/WorldService.h"
#include "../../src/engine/Engine.h"
#include "../Tester.h"
#include "../../src/engine/services/world/components/MovementComponent.h"
#include "../../src/engine/services/world/WorldRegistry.h"

namespace PEngine::EngineTest {
    Engine *engine = nullptr;
    WorldService *world = nullptr;

    void shouldAddEntity() {
        Entity *entity = world->addEntity();
        REQUIRE(world->hasEntity(entity->getEntityId()) == true);
    }

    void shouldRemoveEntity() {
        Entity *entity = world->addEntity();
        std::uint32_t id = entity->getEntityId();
        world->removeEntity(id);
        REQUIRE(world->hasEntity(id) == false);
    }


    void shouldAddComponent() {
        Entity *entity = world->addEntity();
        world->addComponent(ComponentType::MOVEMENT, entity);
        world->getComponent(ComponentType::MOVEMENT, entity);
    }

    void shouldRemoveComponent() {
        Entity *entity = world->addEntity();
        world->addComponent(ComponentType::MOVEMENT, entity);
        world->removeComponent(ComponentType::MOVEMENT, entity);

        bool found = false;
        auto v = world->getRegistry()->getWorldReg().view<MovementComponent>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(world->hasComponent(ComponentType::MOVEMENT, entity) == false);
        REQUIRE(found == false);
    }

    void shouldHaveComponent() {
        Entity *entity = world->addEntity();
        world->addComponent(ComponentType::MOVEMENT, entity);

        bool found = false;
        auto v = world->getRegistry()->getWorldReg().view<MovementComponent>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(world->hasComponent(ComponentType::MOVEMENT, entity) == true);
        REQUIRE(found == true);
    }


    Tester *createTester() {
        engine = new Engine;
        world = engine->getWorldService();

        auto tester = new Tester("EngineTest");
        tester->registerTest("Should add entity", shouldAddEntity);
        tester->registerTest("Should remove entity", shouldRemoveEntity);
        tester->registerTest("Should add component", shouldAddComponent);
        tester->registerTest("Should remove component", shouldRemoveComponent);
        tester->registerTest("Should have component", shouldHaveComponent);
        return tester;
    }

}
