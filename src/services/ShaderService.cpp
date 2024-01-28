#include "ShaderService.h"
#include "../ui/shared/webview/WebViewPayload.h"
#include "../ui/shared/webview/WebViewWindow.h"
#include "FileSystemService.h"
#include "../util/StringUtils.h"

#define REQUEST_SHADER "REQUEST_SHADER"

namespace PEngine {
    std::string ShaderService::RequestShader(const std::string &shaderFileName) {
        std::string baseShader = FileSystemService::ReadFile(shaderFileName);
        const std::vector<std::string> &includes = StringUtils::Matches(baseShader, "#include");
        for (const std::string &include: includes) {
            std::string includeCopy = include;
            StringUtils::replace(includeCopy, "#include \"./", "");
            StringUtils::replace(includeCopy, "\"", "");
            const std::string &shaderPart = RequestShader(includeCopy);
            StringUtils::replace(baseShader, include, shaderPart);
        }
        return baseShader;
    }

    void ShaderService::HandleEvent(WebViewPayload &payload) {
        if (payload.id == REQUEST_SHADER) {
            payload.resolve(RequestShader(payload.payload));
        }
    }

    void ShaderService::BindEvents(WebViewWindow *pWindow) {
        pWindow->addMessageListener(REQUEST_SHADER, HandleEvent);
    }
}