#ifndef CATALYST_EDITORWINDOW_H
#define CATALYST_EDITORWINDOW_H


#include "../../core/IWindow.h"
#include "../../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class EditorWindow : public IWindow {
    private:
        Engine engine = Engine(new IOController, new FSController);
    public:
        explicit EditorWindow();

        void onInitialize() override;
    };
}

#endif
