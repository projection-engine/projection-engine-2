#include "MainView.h"

namespace PEngine {
    IElement *MainView::copy() {
        return new MainView;
    }
}