#include "ILoggable.h"
#include "../UUID.h"

namespace PEngine {
    std::unordered_map<std::string, std::shared_ptr<spdlog::logger>>  ILoggable::loggers{};

    ILoggable::ILoggable(const char *name) {
        init(name);
    }

    void ILoggable::setLoggingLevel(spdlog::level::level_enum level) {
        for (const auto &logger: loggers) {
            logger.second->set_level(level);
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
        loggers[uuid] = logger;
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
        if (loggers.count(uuid)) {
            loggers.erase(uuid);
        }
    }

    ILoggable::ILoggable() {
        uuid = UUID::v4();
    }

    size_t ILoggable::activeLoggersSize() {
        return loggers.size();
    }
}
