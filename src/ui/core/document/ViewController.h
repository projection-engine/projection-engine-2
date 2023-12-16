#ifndef CATALYST_VIEWCONTROLLER_H
#define CATALYST_VIEWCONTROLLER_H


#include "pugixml.hpp"
#include "../../../core/debug/ILoggable.h"
#include <string>

namespace PEngine {
    template<typename K, typename V>
    class Map;

    class IView;

    class IElement;

    class ViewController : public ILoggable {
    private:
        List<IView> views;
    public:
        static Map<std::string, IView *> registeredViews;

        List<IView> &getViews();

        IView *addView(const char *tag);
    };
}


#endif
