#ifndef PROJECTION_SHADERUTIL_H
#define PROJECTION_SHADERUTIL_H

#include <string>

namespace PEngine {
    class AbstractFSService;

    class ShaderUtil {
    public:
        static std::string RequestShader(AbstractFSService *fs, const std::string& shaderFileName, bool isPartialShader);
    };

}

#endif
