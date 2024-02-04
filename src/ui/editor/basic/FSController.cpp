#include "FSController.h"
#include "../../../services/FileSystemService.h"

namespace PEngine {

    std::string FSController::readFile(const std::string &path) {
        return FileSystemService::ReadFile(path);
    }
}