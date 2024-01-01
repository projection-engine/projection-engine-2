import ProjectDTO from "./ProjectDTO";
import WebViewSystem from "../../shared/webview/WebViewSystem";
import ProjectsMessages from "./ProjectsMessages";

export default class ProjectSystem {
    static async readAllProjects(): Promise<ProjectDTO[]> {
        const result = await WebViewSystem.wire(null, ProjectsMessages.READ_PROJECTS_CACHE)
        if (result != null && result.getPayload() != null) {
            try {
                return JSON.parse(result.getPayload()).map(ProjectDTO.of)
            } catch (ex) {
                console.error(ex)
            }
        }
        return []
    }

    static createAndOpenProject(projectName: string) {
        WebViewSystem.beam(projectName, ProjectsMessages.CREATE_PROJECT)
    }
}