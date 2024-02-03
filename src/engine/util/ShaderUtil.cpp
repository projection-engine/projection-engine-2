#include <vector>
#include "ShaderUtil.h"
#include "../services/AbstractFSService.h"
#include "../../util/StringUtils.h"

namespace PEngine {
    std::string ShaderUtil::RequestShader(AbstractFSService *fs, const std::string& name, bool isPartialShader) {
        std::string baseShader = isPartialShader ? name : fs->readFile(name);
        const std::vector<std::string> &includes = StringUtils::Matches(baseShader, "#include");
        for (const std::string &include: includes) {
            std::string includeCopy = include;
            StringUtils::replace(includeCopy, "#include \"./", "");
            StringUtils::replace(includeCopy, "\"", "");
            const std::string &shaderPart = RequestShader(fs, includeCopy, false);
            StringUtils::replace(baseShader, include, shaderPart);
        }
        return baseShader;
    }
}