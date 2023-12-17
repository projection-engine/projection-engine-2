#include <catch2/catch_test_macros.hpp>
#include "entt/entt.hpp"
#include "../../src/engine/world/WorldSystem.h"
#include "../../src/engine/Engine.h"
#include "../Tester.h"
#include "../../src/engine/world/components/CTransform.h"

namespace PEngine::EngineTest {
    static Engine engine(nullptr, nullptr);


    void shouldAddEntity() {
        IEntity *entity = engine.getWorld().addEntity();
        IEntity *entityWithName = engine.getWorld().addEntity("Name");
        REQUIRE(engine.getWorld().hasEntity(entity->getUUID()) == true);
        REQUIRE(engine.getWorld().hasEntity(entityWithName->getUUID()) == true);
        REQUIRE(entityWithName->getName() == "Name");
    }

    void shouldRemoveEntity() {
        IEntity *entity = engine.getWorld().addEntity();
        std::string uuid = entity->getUUID();
        engine.getWorld().removeEntity(uuid);
        REQUIRE(engine.getWorld().hasEntity(uuid) == false);
    }


    void shouldAddComponent() {
        IEntity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<CTransform>(entity);
        IComponent *component = engine.getWorld().getComponent<CTransform>(entity);

        REQUIRE(component != nullptr);
    }

    void shouldRemoveComponent() {
        IEntity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<CTransform>(entity);
        engine.getWorld().removeComponent<CTransform>(entity);

        bool found = false;
        auto v = engine.getWorld().getRegistry().view<CTransform>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(engine.getWorld().hasComponent<CTransform>(entity) == false);
        REQUIRE(found == false);
    }

    void shouldHaveComponent() {
        IEntity *entity = engine.getWorld().addEntity();
        engine.getWorld().addComponent<CTransform>(entity);

        bool found = false;
        auto v = engine.getWorld().getRegistry().view<CTransform>();
        for (auto ent: v) {
            if (ent == entity->getEntity()) {
                found = true;
            }
        }
        REQUIRE(engine.getWorld().hasComponent<CTransform>(entity) == true);
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