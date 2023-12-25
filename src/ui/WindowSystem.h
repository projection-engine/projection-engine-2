#ifndef PROJECTION_WINDOWSYSTEM_H
#define PROJECTION_WINDOWSYSTEM_H

#include <string>
#include <unordered_map>

namespace PEngine {
    class IWindow;

    class IRunner;

    class WindowSystem {
    private:
        std::unordered_map<std::string, IWindow *> windows;
        std::string mainWindowId;
        IRunner *runner;

        void createWindowInternal(const std::string &id, IWindow *window);

    public:

        template<class W>
        void createWindow(const std::string &id) {
            createWindowInternal(id, new W);
        }

        void activateMainWindow(const std::string &id);
    };

}

#endif
