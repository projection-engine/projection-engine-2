#include <iostream>
#include "util/Definitions.h"
#include "ui/WindowSystem.h"
#include "ui/projects/Projects.h"
#include "ui/editor/Editor.h"

int main(int, char **) {
    PEngine::WindowSystem system;
    system.createWindow<PEngine::Projects>(PROJECTS_WINDOW);
    system.createWindow<PEngine::Editor>(EDITOR_WINDOW);

    system.activateMainWindow(PROJECTS_WINDOW);

    return 0;
}