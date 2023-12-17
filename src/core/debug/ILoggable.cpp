#include "ILoggable.h"
#include "../UUID.h"

namespace PEngine {
    List<std::shared_ptr<spdlog::logger>> ILoggable::loggers;

    ILoggable::ILoggable(const char *name) {
        init(name);
    }

    void ILoggable::setLoggingLevel(spdlog::level::level_enum level) {
        loggers.iterate();
        while (loggers.hasNext()) {
            auto logger = *loggers.next();
            if(logger != nullptr) {
                logger->set_level(level);
            }
        }
    }

    std::shared_ptr<spdlog::logger> ILoggable::getLogger() {
        return logger;
    }

    spdlog::level::level_enum ILoggable::getLoggingLevel() {
        return logger->level();
    }

    void ILoggable::init(const std::string &name) {
        logger = spdlog::stdout_color_mt(name + UUID::v4());
        spdlog::set_pattern("%^[%T - %v%$");
    }

    std::shared_ptr<spdlog::logger> ILoggable::getNewLogger(const char *name) {
        return spdlog::stdout_color_mt(name);
    }

    bool ILoggable::hasLogger() {
        return logger != nullptr;
    }

    std::shared_ptr<spdlog::logger> ILoggable::getLogger(const char *name) {
        init(name);
        return logger;
    }

    ILoggable::~ILoggable() {
        loggers.remove(&logger);
    }

    ILoggable::ILoggable() {
        loggers.push(&logger);
    }

    size_t ILoggable::activeLoggersSize() {
        return loggers.getLength();
    }
}