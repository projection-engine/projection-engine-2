import ProjectDTO from "./ProjectDTO";
import WebViewSystem from "../../shared/webview/WebViewSystem";

export default class ProjectSystem {
    static readAllProjects(): Promise<ProjectDTO[]> {
        return new Promise(resolve => {
            WebViewSystem.sendMessageWithCallback(null, "READ_PROJECTS_CACHE", result => {
                if (result != null) {
                    resolve(JSON.parse(result.getPayload()).map(ProjectDTO.of))
                    return
                }
                resolve([])
            })
        })
    }

    static createAndOpenProject(projectName: string) {
        WebViewSystem.sendMessage(projectName, "CREATE_PROJECT")
    }
}