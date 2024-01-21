import FileSystemUtil from "@lib/FileSystemUtil"
import Engine from "@engine-core/Engine"
import EditorFSUtil from "../window/editor/util/EditorFSUtil"
import SelectionStore from "@lib/stores/SelectionStore"
import serializeStructure from "@engine-core/utils/serialize-structure"
import QueryAPI from "@engine-core/services/QueryAPI"
import PickingAPI from "@engine-core/services/PickingAPI"
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
import RepositoryService from "@engine-core/services/serialization/RepositoryService";


@Injectable
export default class ProjectService extends IInjectable {
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


    async save() {
        try {
            const path = await ProjectService.fsService.requestCurrentFilePath()
            if (path == null || path.length === 0) {
                await this.saveAs()
                return
            }
            await ProjectService.fsService.writeFile(path, RepositoryService.dump())
            await ProjectService.fsService.writeFile(path, RepositoryService.dump())
            ProjectService.toasterService.success(LocalizationEN.SAVED)
        } catch (ex) {
            ProjectService.toasterService.error(ex.message)
            console.error(ex)
        }
    }

    async open() {
        // @ts-ignore
        const handle = await window.showOpenFilePicker({
            types: [
                {
                    description: "Projection engine project file",
                    accept: {"application/json": [".projection"]},
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        }) as FileSystemFileHandle[]
        if (handle.length > 0) {
            const file = await handle[0].getFile()
            const content = await file.text()

            try {
                RepositoryService.restore(content)
                ProjectService.selectionStore.updateStore(ProjectService.selectionStore.getData())
                ProjectService.settingsStore.updateStore(ProjectService.settingsStore.getData())
            } catch (ex) {
                ProjectService.toasterService.error(ex.message)
                console.error(ex)
            }
        }
    }

    async saveAs() {
        try {
            const opts = {
                types: [
                    {
                        description: "Projection engine project file",
                        accept: {"application/json": [".projection"]},
                    },
                ],
            };

            // @ts-ignore
            const fileHandle = await window.showSaveFilePicker(opts) as FileSystemFileHandle
            await this.#write(fileHandle)
            ProjectService.toasterService.success(LocalizationEN.SAVED)
        } catch (ex) {
            ProjectService.toasterService.error(ex.message)
            console.error(ex)
        }
    }

    async #write(fileHandle: FileSystemFileHandle) {
        const writable = await fileHandle.createWritable();
        await writable.write(RepositoryService.dump());
        await writable.close();
    }
}



