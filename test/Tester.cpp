#include "Tester.h"
#include <utility>

Tester::Tester(std::string n) {
    name = std::move(n);
    logger = spdlog::stdout_color_mt(name);
    spdlog::set_pattern("%^[%T - %n] %v%$");
}

void Tester::registerTest(std::string testDescription, void (*callback)()) {
    registered.push_back(RegisteredTest{name = std::move(testDescription), callback});
}

void Tester::run() {
    logger->set_level(spdlog::level::warn);
    logger->warn("RUNNING TESTS {0} {1}", registered.size(), name);

    for (int i = 0; i < registered.size(); i++) {
        RegisteredTest test = registered[i];
        logger->set_level(spdlog::level::warn);
        logger->warn("**EXECUTING TEST** {0}", test.name);
        test.callback();
    }
}
