#include <catch2/catch_test_macros.hpp>

#include "../Tester.h"
#include "../../src/core/structures/List.h"

namespace PEngine::ListTest {


    List<int> *getPopulatedList() {
        auto *list = new List<int>();
        int value = 1;
        int value2 = 2;
        int value3 = 3;

        list->push(&value);
        list->push(&value2);
        list->push(&value3);

        return list;
    }

    void listAdd() {
        auto *list = getPopulatedList();
        REQUIRE(list->getLength() == 3);
    }

    void listReplace() {
        auto *list = getPopulatedList();
        REQUIRE(*list->get(0) == 1);
        int two = 2;
        list->replaceAt(0, &two);
        REQUIRE(*list->get(0) == two);
    }

    void listRemove() {
        auto *list = new List<int>();
        int value = 1;
        list->push(&value);

        REQUIRE(list->getLength() == 1);
        list->pop();
        REQUIRE(list->getLength() == 0);
    }

    void listRemoveByPointer() {
        auto *list = new List<int>();
        int value = 1;
        list->push(&value);

        REQUIRE(list->getLength() == 1);
        list->remove(&value);
        REQUIRE(list->getLength() == 0);
    }

    void listRemoveIndex() {
        {
            auto *list = getPopulatedList();

            REQUIRE(list->getLength() == 3);
            int *value3 = list->get(2);
            list->removeAt(2);
            REQUIRE(list->includes(value3) == false);
            REQUIRE(list->getLength() == 2);
        }

        {
            auto *list = new List<int>();
            int value = 1;
            list->push(&value);
            REQUIRE(list->getLength() == 1);
            list->removeAt(0);
            REQUIRE(list->getLength() == 0);
        }
    }

    void indexOf() {
        auto *list = new List<int>();
        int value = 1;
        int value1 = 2;
        list->push(&value);
        list->push(&value1);
        REQUIRE(list->indexOf(&value1) == 1);
    }

    void listIterate() {
        auto *list = getPopulatedList();

        REQUIRE(list->hasNext() == false);
        list->iterate();
        REQUIRE(list->hasNext() == true);
        list->next();
        list->next();
        REQUIRE(list->hasNext() == true);
        list->next();
        REQUIRE(list->hasNext() == false);
    }

    void listFirst() {
        auto *list = getPopulatedList();
        int *pInt = list->get(0);
        REQUIRE(list->getFirst()->value == pInt);
    }

    void listFirstNull() {
        auto *list = new List<int>();
        REQUIRE(list->getFirst() == nullptr);
    }


    void listLastNull() {
        auto *list = new List<int>();
        REQUIRE(list->getLast() == nullptr);
    }

    void listLast() {
        auto *list = getPopulatedList();
        int *pInt = list->get(2);
        REQUIRE(list->getLast()->value == pInt);
    }

    void listFirstIsLast() {
        auto *list = new List<int>();
        int value = 1;
        list->push(&value);
        REQUIRE(list->getFirst() == list->getLast());
    }

    void listEndEqualStartNext() {
        auto *list = getPopulatedList();
        REQUIRE(list->getLength() == 3);

        ListItem<int> *first = list->getItem(0);

        list->removeAt(2);
        REQUIRE(list->getLength() == 2);
        list->removeAt(1);
        REQUIRE(list->getLength() == 1);

        int a1 = 1;
        int a2 = 1;
        list->push(&a1);
        list->push(&a2);
        REQUIRE(first == list->getFirst());
        REQUIRE(list->getLength() == 3);
        REQUIRE(list->getItem(2) == list->getLast());
    }

    
    Tester *createTester() {
        auto tester = new Tester("ListTest");
        tester->registerTest("Should add elements to list", listAdd);
        tester->registerTest("Should find index", indexOf);
        tester->registerTest("Should replaceAtIndex", listReplace);
        tester->registerTest("Should pop", listRemove);
        tester->registerTest("Should remove by pointer", listRemoveByPointer);
        tester->registerTest("Should remove element from index", listRemoveIndex);
        tester->registerTest("Should iterate", listIterate);
        tester->registerTest("Should get first item", listFirst);
        tester->registerTest("Should get null as first item", listFirstNull);
        tester->registerTest("Should get null as last item", listLast);
        tester->registerTest("Should get last item", listLastNull);
        tester->registerTest("Should first equal last", listFirstIsLast);
        tester->registerTest("Should last be tail", listEndEqualStartNext);
        return tester;
    }
}
