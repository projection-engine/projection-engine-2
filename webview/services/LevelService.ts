import FileSystemUtil from "@lib/FileSystemUtil"
import Engine from "@engine-core/Engine"
import EditorFSUtil from "../window/editor/util/EditorFSUtil"
import SelectionStore from "@lib/stores/SelectionStore"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import serializeStructure from "@engine-core/utils/serialize-structure"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"
import AXIS from "@engine-tools/static/AXIS"
import LocalizationEN from "@enums/LocalizationEN"
import FileTypes from "@enums/FileTypes"
import EditorUtil from "../window/editor/util/EditorUtil"
import {Inject, Injectable} from "@lib/Injection";
import VisualsStore from "@lib/stores/VisualsStore";
import EngineStore from "@lib/stores/EngineStore";
import ToasterService from "@services/ToasterService";
import EntityHierarchyService from "@services/EntityHierarchyService";
import SettingsStore from "@lib/stores/SettingsStore";
import EntityNamingService from "@services/EntityNamingService";
import IInjectable from "@lib/IInjectable";


@Injectable
export default class LevelService extends IInjectable{
    #levelToLoad

    @Inject(VisualsStore)
    static visualsStore: VisualsStore

    @Inject(Engine)
    static engine: Engine

    @Inject(EngineStore)
    static engineStore: EngineStore

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

    getLevelToLoad() {
        const old = this.#levelToLoad
        this.#levelToLoad = undefined
        return old
    }

    async loadLevel(levelID?: string) {
        if (!levelID || levelID && levelID === LevelService.engine.loadedLevel?.id) {
            if (levelID && levelID === LevelService.engine.loadedLevel?.id)
                LevelService.toasterService.error(LocalizationEN.LEVEL_ALREADY_LOADED)
            return
        }


        await EditorFSUtil.readRegistry()
        LevelService.entityNamingService.clear()
        LevelService.selectionStore.updateStore({
            array: []
        })
        SelectionStore.setLockedEntity(undefined)

        await LevelService.engine.loadLevel(levelID, false)
        const entities = LevelService.engine.entities.array
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.setPickID(PickingAPI.getPickerId(i + AXIS.ZY + 1))
        }
        if (LevelService.engine.loadedLevel)
            SelectionStore.setLockedEntity(LevelService.engine.loadedLevel.id)
        LevelService.entityHierarchyService.updateHierarchy()
    }

    async save() {
        if (LevelService.engineStore.getData().executingAnimation) {
            LevelService.toasterService.warn(LocalizationEN.EXECUTING_SIMULATION)
            return
        }

        LevelService.toasterService.warn(LocalizationEN.SAVING)
        try {
            const metadata = LevelService.engineStore.getData().meta
            const settings = {...LevelService.settingsStore.getData()}
            await FileSystemUtil.writeFile(
                FileSystemUtil.path + FileSystemUtil.sep + FileTypes.PROJECT,
                JSON.stringify({
                    ...metadata,
                    settings,
                    visualSettings: LevelService.visualsStore.getData(),
                    level: LevelService.engine.loadedLevel?.id
                }), true)

            await this.saveCurrentLevel().catch(console.error)
        } catch (err) {
            console.error(err)
            return
        }
        LevelService.toasterService.success(LocalizationEN.PROJECT_SAVED)
        await EditorFSUtil.readRegistry()
    }

    async saveCurrentLevel() {
        if (!LevelService.engine.loadedLevel)
            return
        const serialized = {
            entity: LevelService.engine.loadedLevel.serializable(),
            entities: QueryAPI.getHierarchy(LevelService.engine.loadedLevel).map(e => e.serializable()),
        }

        const assetReg = EditorFSUtil.getRegistryEntry(LevelService.engine.loadedLevel.id)
        let path = assetReg?.path

        if (!assetReg) {
            path = FileSystemUtil.resolvePath(await EditorUtil.resolveFileName(FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + LevelService.engine.loadedLevel.name, FileTypes.LEVEL))
            await EditorFSUtil.createRegistryEntry(LevelService.engine.loadedLevel.id, FileSystemUtil.sep + path.split(FileSystemUtil.sep).pop())
            EditorFSUtil.readRegistry().catch(console.error)
        } else
            path = FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + path

        await FileSystemUtil.write(
            path,
            serializeStructure(serialized)
        )
    }
}



