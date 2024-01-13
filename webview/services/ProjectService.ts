import FileSystemUtil from "@lib/FileSystemUtil"
import Engine from "@engine-core/Engine"
import EditorFSUtil from "../window/editor/util/EditorFSUtil"
import SelectionStore from "@lib/stores/SelectionStore"
import serializeStructure from "@engine-core/utils/serialize-structure"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"
import AXIS from "@engine-tools/static/AXIS"
import LocalizationEN from "@enums/LocalizationEN"
import FileTypes from "@enums/FileTypes"
import EditorUtil from "../window/editor/util/EditorUtil"
import {Inject, Injectable} from "@lib/Injection";
import ToasterService from "@services/ToasterService";
import EntityHierarchyService from "@services/EntityHierarchyService";
import SettingsStore from "@lib/stores/SettingsStore";
import EntityNamingService from "@services/EntityNamingService";
import IInjectable from "@lib/IInjectable";
import WebViewService from "@lib/webview/WebViewService";
import FSService from "@lib/FSService";


@Injectable
export default class ProjectService extends IInjectable {
    static SET_PROJECT_PATH = "SET_PROJECT_PATH"

    @Inject(Engine)
    static engine: Engine

    @Inject(FSService)
    static fsService: FSService

    @Inject(WebViewService)
    static webViewService: WebViewService

    @Inject(SelectionStore)
    static selectionStore: SelectionStore

    @Inject(ToasterService)
    static toasterService: ToasterService

    @Inject(EntityHierarchyService)
    static entityHierarchyService: EntityHierarchyService

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    @Inject(EntityNamingService)
    static entityNamingService: EntityNamingService

    async load(pathToFile: string) {
        ProjectService.webViewService.beam(ProjectService.SET_PROJECT_PATH, pathToFile)

        // TODO - LOAD
    }

    async save() {
        if (ProjectService.settingsStore.getData().executingAnimation) {
            ProjectService.toasterService.error(LocalizationEN.EXECUTING_SIMULATION)
            return
        }

        ProjectService.toasterService.warn(LocalizationEN.SAVING)
        try {
            const path = await ProjectService.fsService.requestCurrentFilePath();
            const content = JSON.stringify(ProjectService.settingsStore.getData());

            // TODO - SAVE ENGINE INFORMATION ALSO
            ProjectService.fsService.writeFile(path, content)
        } catch (err) {
            console.error(err)
            return
        }
        ProjectService.toasterService.success(LocalizationEN.PROJECT_SAVED)
    }
}



