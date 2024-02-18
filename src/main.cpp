#include "util/Definitions.h"
#include "ui/editor/Editor.h"

int main(int, char **) {
    auto window = PEngine::Editor{};
    window.run();
    return 0;
}
