#include "util/Definitions.h"
#include "ui/WindowRepository.h"
#include "ui/projects/Projects.h"
#include "ui/editor/Editor.h"

int main(int, char **) {
    PEngine::WindowRepository::Get().createWindow<PEngine::Projects>(PROJECTS_WINDOW);
    PEngine::WindowRepository::Get().createWindow<PEngine::Editor>(EDITOR_WINDOW);
    PEngine::WindowRepository::Get().activateWindow(PROJECTS_WINDOW);
    PEngine::WindowRepository::Get().run();
    return 0;
}