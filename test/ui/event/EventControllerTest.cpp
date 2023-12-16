#include "EventControllerTest.h"
#include "catch2/catch_all.hpp"
#include "../../Tester.h"
#include "Listener.h"
#include "../../../src/core/event/EventController.h"
#include "../../../src/core/event/TypedEventPayload.h"


namespace PEngine::EventControllerTest {
    void shouldTriggerEvent() {
        auto l = new Listener;
        EventController::get()->addListener("click", l);
        EventController::get()->triggerEvent("click");

        REQUIRE(l->called == true);
    }

    void shouldTriggerEventByPayload() {
        auto l = new Listener;
        TypedEventPayload<int> p("click", 1);

        EventController::get()->addListener("click", l);
        EventController::get()->triggerEvent(p);

        auto *pPayload = (TypedEventPayload<int> *) l->event;
        REQUIRE(l->called == true);
        REQUIRE(pPayload == &p);
    }

    void shouldNotTriggerEvent() {
        auto l = new Listener;
        EventController::get()->addListener("click", l);
        EventController::get()->removeListener("click", l);
        EventController::get()->triggerEvent("click");

        REQUIRE(l->called == false);
    }

    void shouldTriggerMultiple() {
        auto l = new Listener;
        auto l1 = new Listener;
        auto l2 = new Listener;
        EventController::get()->addListener("click", l);
        EventController::get()->addListener("click", l1);
        EventController::get()->addListener("click", l2);
        EventController::get()->triggerEvent("click");
        EventController::get()->triggerEvent("click");
        EventController::get()->triggerEvent("click");

        REQUIRE(l->called == true);
        REQUIRE(l1->called == true);
        REQUIRE(l2->called == true);
    }


    Tester *createTester() {
        auto tester = new Tester("EventControllerTest");
        tester->registerTest("Should trigger event", shouldTriggerEvent);
        tester->registerTest("Should not trigger event", shouldNotTriggerEvent);
        tester->registerTest("Should trigger multiple events", shouldTriggerMultiple);
        tester->registerTest("Should trigger event by payload", shouldTriggerEventByPayload);
        return tester;
    }
}