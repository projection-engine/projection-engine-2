#include "ProjectsService.h"

#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "../shared/IWindow.h"
#include "../WindowRepository.h"
#include "WebView2.h"
#include "../../util/FileSystemUtil.h"
#include "nlohmann/json.hpp"
#include "../../util/UUID.h"

namespace PEngine {
    void ProjectsService::reload(WebViewPayload &payload) {
        payload.webview->getWebView()->Reload();
    }

    void ProjectsService::createProject(WebViewPayload &payload) {
        std::string basePath = FileSystemUtil::GetCurrentPath() + "/projects";
        FileSystemUtil::CreateDirectory(basePath);

        const std::string &projectId = UUID::v4();
        std::string projectPath = basePath + "/" + projectId;
        FileSystemUtil::CreateDirectory(projectPath);

        nlohmann::json metadata;
        metadata["name"] = payload.payload;
        metadata["id"] = projectId;
        const std::string &pathToMetadata = projectPath + "/" + "metadata.json";
        FileSystemUtil::WriteFile(pathToMetadata, metadata.dump());

        IWindow *window = payload.window;
        WindowRepository *rep = window->getWindowRepository();

        rep->setActiveWindow(EDITOR_WINDOW);
        rep->getActiveWindow()->postWebViewMessage(EDITOR_WINDOW, "LOAD_PROJECT", pathToMetadata);

        addToCache(projectPath, payload.payload, projectId);
    }

    void ProjectsService::addToCache(const std::string &path, const std::string &name, const std::string &id) {
        // TODO
    }

    void ProjectsService::readProjectsCache(WebViewPayload &payload) {
        std::string result = FileSystemUtil::ReadFile(FileSystemUtil::GetCurrentPath() + "/projects-cache.json");
        payload.resolve(result.c_str());
    }
}