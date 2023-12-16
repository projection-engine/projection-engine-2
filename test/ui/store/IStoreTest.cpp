#include "catch2/catch_all.hpp"
#include "IStoreTest.h"
#include "../../Tester.h"
#include "../../../src/ui/core/store/IStore.h"
#include "SampleStore.h"
#include "SampleData.h"
#include "../event/Listener.h"
#include "../../../src/core/event/EventController.h"

namespace PEngine::IStoreTest {
    void clear() {
        SampleData *pData = SampleStore::getData();
        SampleStore::clear();
        REQUIRE(pData != SampleStore::getData());
    }

    void isNotNull() {
        SampleStore::clear();

        SampleData *pData = SampleStore::getData();
        REQUIRE(pData != nullptr);
    }

    void shouldUpdateSame() {
        SampleStore::clear();

        SampleData *pData = SampleStore::getData();
        pData->number = -1;
        SampleStore::updateData(pData);
        REQUIRE(pData != nullptr);
        REQUIRE(pData->number == -1);
    }

    void shouldUpdateNew() {
        SampleStore::clear();
        auto *pDataNew = new SampleData;
        pDataNew->number = -1;

        REQUIRE(SampleStore::getData()->number == 0);
        SampleStore::updateData(pDataNew);
        REQUIRE(pDataNew->number == -1);
    }

    void shouldTriggerEvent() {
        auto l = new Listener;
        EventController::get()->addListener(SampleStore::getStoreId(), l);
        SampleStore::updateData(SampleStore::getData());
        REQUIRE(l->called == true);
    }

    Tester *createTester() {
        auto tester = new Tester("IStoreTest");
        tester->registerTest("Should clear", clear);
        tester->registerTest("Should have data", isNotNull);
        tester->registerTest("Should run same", shouldUpdateSame);
        tester->registerTest("Should run new", shouldUpdateNew);
        tester->registerTest("Should trigger run", shouldTriggerEvent);
        return tester;
    }
}