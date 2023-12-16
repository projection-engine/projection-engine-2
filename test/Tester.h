#ifndef CATALYST_TESTER_H
#define CATALYST_TESTER_H

#include <string>
#include <vector>
#include <utility>
#include "spdlog/sinks/stdout_color_sinks.h"
#include "spdlog/spdlog.h"

struct RegisteredTest{
    std::string name;
    void(*callback)();
};

class Tester {
private:
    std::string name;
    std::shared_ptr<spdlog::logger> logger;
    std::vector<RegisteredTest> registered;
public:
    explicit Tester(std::string n);

    void run();

    void registerTest(std::string testDescription, void(*callback)());
};


#endif
