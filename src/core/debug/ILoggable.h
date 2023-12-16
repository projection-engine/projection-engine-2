#ifndef CATALYST_ILOGGABLE_H
#define CATALYST_ILOGGABLE_H
#define CONSOLE_ERROR(...) if(this->hasLogger()) this->getLogger()->error("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__)); else this->getLogger(typeid(*this).name())->error("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__));
#define CONSOLE_WARN(...) if(this->hasLogger()) this->getLogger()->warn("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__)); else this->getLogger(typeid(*this).name())->warn("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__));
#define CONSOLE_LOG(...) if(this->hasLogger()) this->getLogger()->info("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__)); else this->getLogger(typeid(*this).name())->info("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__));
#define CONSOLE_TRACE(...) if(this->hasLogger()) this->getLogger()->trace("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__)); else this->getLogger(typeid(*this).name())->trace("{0}#{1}] {2}", __FUNCTION__, __LINE__, fmt::format(__VA_ARGS__));

#include "spdlog/spdlog.h"
#include "spdlog/sinks/stdout_color_sinks.h"
#include "spdlog/fmt/ostr.h"
#include "../structures/List.h"

namespace PEngine {
    class ILoggable {
    private:
        static List<std::shared_ptr<spdlog::logger>> loggers;

        std::shared_ptr<spdlog::logger> logger;

        void init(const std::string &name);

    public:
        ~ILoggable();

        ILoggable();

        static std::shared_ptr<spdlog::logger> getNewLogger(const char *name);

        explicit ILoggable(const char *name);

        spdlog::level::level_enum getLoggingLevel();

        static void setLoggingLevel(spdlog::level::level_enum level);

        static size_t activeLoggersSize();

        bool hasLogger();

        std::shared_ptr<spdlog::logger> getLogger();

    protected:

        std::shared_ptr<spdlog::logger> getLogger(const char *name);
    };
}


#endif
