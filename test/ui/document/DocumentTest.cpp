#include "DocumentTest.h"
#include "catch2/catch_all.hpp"
#include "../../../src/ui/shared/document/Document.h"
#include "../../Tester.h"
#include "Example.h"

namespace PEngine::DocumentTest {
    Document d;

    void loadView() {
        Document::registerView("Example", new Example);
        d.addView("Example");
        List<IElement> &elements = d.getElements();

        IElement *first = elements.getFirstValue();
        IElement *second = first->getChildren()->getFirstValue();
        IElement *third = second->getChildren()->getFirstValue();

        REQUIRE(elements.getLength() == 1);
        REQUIRE(first->getChildren()->getLength() == 1);
        REQUIRE(second->getChildren()->getLength() == 1);
        REQUIRE(second->getId() == "SECTION");
        REQUIRE(third->getChildren()->getLength() == 0);
        REQUIRE(third->getId() == "TEXT");
    }

    void findDeepChild() {
        List<IElement> &elements = d.getElements();
        IElement *first = elements.getFirstValue();
        IElement *second = first->getChildren()->getFirstValue();
        IElement *third = second->getChildren()->getFirstValue();
        REQUIRE(d.getElementById("SECTION") == second);
        REQUIRE(d.getElementById("TEXT") == third);
    }

    Tester *createTester() {
        auto tester = new Tester("DocumentTest");
        tester->registerTest("Should load view", loadView);
        tester->registerTest("Should find deep child", findDeepChild);
        return tester;
    }
}