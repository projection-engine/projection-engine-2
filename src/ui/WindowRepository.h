#ifndef PROJECTION_WINDOWREPOSITORY_H
#define PROJECTION_WINDOWREPOSITORY_H

#include <string>
#include <unordered_map>

namespace PEngine {
    class IWindow;

    class IRunner;

    class WindowRepository {
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

        void setActiveWindow(const std::string &id);
        IWindow *getActiveWindow();
    };

}

#endif
