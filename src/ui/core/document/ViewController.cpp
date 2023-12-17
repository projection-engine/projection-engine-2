#include "ViewController.h"
#include "../views/IView.h"
#include "../../../core/StringUtils.h"
#include "../../../core/structures/Map.cpp"

namespace PEngine {
    PEngine::Map<std::string, IView *> ViewController::registeredViews;

    List<PEngine::IView> &ViewController::getViews() {
        return views;
    }

    IView *ViewController::addView(const char *tag) {
        if (!ViewController::registeredViews.has(tag)) {
            CONSOLE_ERROR("view with tag {0} was not found", tag)
            return nullptr;
        }
        IView *view = (IView *) ViewController::registeredViews.get(tag)->copy();
        if(view == nullptr){
            CONSOLE_ERROR("view {0} doesn't implement method 'copy'", tag)
            return nullptr;
        }

        views.push(view);
        return view;
    }
}