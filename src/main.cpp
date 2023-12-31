#include <iostream>
#include "util/Definitions.h"
#include "ui/WindowRepository.h"
#include "ui/projects/Projects.h"
#include "ui/editor/Editor.h"

int main(int, char **) {
    PEngine::WindowRepository system;
    system.createWindow<PEngine::Projects>(PROJECTS_WINDOW);
    system.createWindow<PEngine::Editor>(EDITOR_WINDOW);

    system.setActiveWindow(PROJECTS_WINDOW);

    return 0;
}