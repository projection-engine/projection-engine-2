#include "ProjectsService.h"

#include "../shared/webview/WebViewWindow.h"
#include "../shared/webview/WebViewPayload.h"
#include "../shared/IWindow.h"
#include "../WindowRepository.h"
#include "WebView2.h"
#include "../../util/FS.h"
#include "../../util/UUID.h"
#include "../../util/JSON.h"
#include "../editor/Editor.h"

#define CACHE_PATH FS::GetCurrentPath() + "/projects-cache.json"

namespace PEngine {
    void ProjectsService::reload(WebViewPayload &payload) {
        payload.webview->getWebView()->Reload();
    }

    void ProjectsService::createProject(WebViewPayload &payload) {
        std::string basePath = FS::GetCurrentPath() + "/projects";
        FS::CreateDir(basePath);

        const std::string &projectId = UUID::v4();
        std::string projectPath = basePath + "/" + projectId;
        FS::CreateDir(projectPath);

        JSON metadata{};
        metadata.set("name", payload.payload.c_str());
        metadata.set("id", projectId.c_str());
        const std::string &pathToMetadata = projectPath + "/" + "metadata.json";
        FS::WriteFile(pathToMetadata, metadata.stringify());
        addToCache(projectPath, payload.payload, projectId);

        IWindow *window = payload.window;
        WindowRepository *rep = window->getWindowRepository();

        rep->setActiveWindow(EDITOR_WINDOW);
        auto *currentWindow = dynamic_cast<Editor *>(rep->getActiveWindow());
        currentWindow->setProject(pathToMetadata);

    }

    void ProjectsService::addToCache(const std::string &path, const std::string &name, const std::string &id) {
        JSON result = JSON::parse(FS::ReadFile(CACHE_PATH));
        if (result.isArray()) {
            JSON newItem{};
            newItem.set("path", path.c_str());
            newItem.set("name", name.c_str());
            newItem.set("id", id.c_str());
            result.pushItem(newItem.getData());
        }
        FS::WriteFile(CACHE_PATH, result.stringify());
    }

    void ProjectsService::readProjectsCache(WebViewPayload &payload) {
        std::string result = FS::ReadFile(CACHE_PATH);
        payload.resolve(result.c_str());
    }
}