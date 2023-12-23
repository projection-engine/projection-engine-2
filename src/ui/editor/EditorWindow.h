#ifndef PROJECTION_EDITORWINDOW_H
#define PROJECTION_EDITORWINDOW_H

#include "../core/IWindow.h"
#include "../../engine/Engine.h"
#include "basic/IOController.h"
#include "basic/FSController.h"

namespace PEngine {
    class WebViewWindow;

    class EditorWindow : public IWindow {
    private:
        Engine engine = Engine(new IOController, new FSController);

    protected:
        IRunner *createRunner() override;

    public:
        explicit EditorWindow() : IWindow("Project Editor"){}

        void initialize() override;
    };
}

#endif
