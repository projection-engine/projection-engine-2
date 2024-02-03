#include "FS.h"
#include "../../services/FileSystemService.h"

namespace PEngine {
    std::string FS::readFile(const std::string &path) {
        return FileSystemService::ReadFile(path);
    }
}