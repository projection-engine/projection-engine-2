import FileSystemUtil from "@lib/FileSystemUtil"
import Engine from "@engine-core/Engine"
import EditorFSUtil from "../editor/util/EditorFSUtil"
import EntitySelectionStore from "@lib/stores/EntitySelectionStore"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import CameraTracker from "../../engine/tools/utils/CameraTracker"
import serializeStructure from "@engine-core/utils/serialize-structure"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"
import AXIS from "../../engine/tools/static/AXIS"
import LocalizationEN from "@enums/LocalizationEN"
import FileTypes from "@enums/FileTypes"
import EditorUtil from "../editor/util/EditorUtil"
import TabsStoreUtil from "../editor/util/TabsStoreUtil"
import ProjectionEngine, {Injectable} from "@lib/ProjectionEngine";


@Injectable
export default class LevelService {
    #levelToLoad

    getLevelToLoad() {
        const old = this.#levelToLoad
        this.#levelToLoad = undefined
        return old
    }

    async loadLevel(levelID?: string) {
        if (!levelID || levelID && levelID === ProjectionEngine.Engine.loadedLevel?.id) {
            if (levelID && levelID === ProjectionEngine.Engine.loadedLevel?.id)
                ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.LEVEL_ALREADY_LOADED)
            return
        }


        await EditorFSUtil.readRegistry()
        ProjectionEngine.EntityNamingService.clear()
        ProjectionEngine.EntitySelectionStore.updateStore({
            array: []
        })
        EntitySelectionStore.setLockedEntity(undefined)
        ProjectionEngine.EditorActionHistory.clear()


        await ProjectionEngine.Engine.loadLevel(levelID, false)
        const entities = ProjectionEngine.Engine.entities.array
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.setPickID(PickingAPI.getPickerId(i + AXIS.ZY + 1))
        }
        if (ProjectionEngine.Engine.loadedLevel)
            EntitySelectionStore.setLockedEntity(ProjectionEngine.Engine.loadedLevel.id)
        ProjectionEngine.EntityHierarchyService.updateHierarchy()
    }

    async save() {
        if (!ProjectionEngine.ChangesTrackerStore.getData().changed)
            return

        if (ProjectionEngine.EngineStore.getData().executingAnimation) {
            ProjectionEngine.ToastNotificationSystem.warn(LocalizationEN.EXECUTING_SIMULATION)
            return
        }

        ProjectionEngine.ToastNotificationSystem.warn(LocalizationEN.SAVING)
        try {
            const metadata = ProjectionEngine.EngineStore.getData().meta
            const settings = {...ProjectionEngine.SettingsStore.getData()}
            const tabIndexViewport = TabsStoreUtil.getCurrentTabByCurrentView("viewport")
            const viewMetadata = <MutableObject | undefined>settings.views[settings.currentView].viewport[tabIndexViewport]
            if (viewMetadata !== undefined) {
                viewMetadata.cameraMetadata = ProjectionEngine.Engine.CameraAPI.serializeState()
                viewMetadata.cameraMetadata.prevX = CameraTracker.xRotation
                viewMetadata.cameraMetadata.prevY = CameraTracker.yRotation
            }

            await FileSystemUtil.writeFile(
                FileSystemUtil.path + FileSystemUtil.sep + FileTypes.PROJECT,
                JSON.stringify({
                    ...metadata,
                    settings,
                    layout: ProjectionEngine.TabsStore.getData(),
                    visualSettings: ProjectionEngine.VisualsStore.getData(),
                    level: ProjectionEngine.Engine.loadedLevel?.id
                }), true)

            await this.saveCurrentLevel().catch(console.error)
        } catch (err) {
            console.error(err)
            return
        }
        ProjectionEngine.ToastNotificationSystem.success(LocalizationEN.PROJECT_SAVED)
        await EditorFSUtil.readRegistry()
    }

    async saveCurrentLevel() {
        if (!ProjectionEngine.Engine.loadedLevel)
            return
        const serialized = {
            entity: ProjectionEngine.Engine.loadedLevel.serializable(),
            entities: QueryAPI.getHierarchy(ProjectionEngine.Engine.loadedLevel).map(e => e.serializable()),
        }

        const assetReg = EditorFSUtil.getRegistryEntry(ProjectionEngine.Engine.loadedLevel.id)
        let path = assetReg?.path

        if (!assetReg) {
            path = FileSystemUtil.resolvePath(await EditorUtil.resolveFileName(FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + ProjectionEngine.Engine.loadedLevel.name, FileTypes.LEVEL))
            await EditorFSUtil.createRegistryEntry(ProjectionEngine.Engine.loadedLevel.id, FileSystemUtil.sep + path.split(FileSystemUtil.sep).pop())
            EditorFSUtil.readRegistry().catch(console.error)
        } else
            path = FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + path

        await FileSystemUtil.write(
            path,
            serializeStructure(serialized)
        )
        ProjectionEngine.ChangesTrackerStore.updateStore({changed: false})
    }
}



