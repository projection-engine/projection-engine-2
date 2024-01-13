import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import UIAPI from "@engine-core/lib/rendering/UIAPI"
import Engine from "@engine-core/Engine"
import ScriptsAPI from "@engine-core/lib/utils/ScriptsAPI"
import ResourceEntityMapper from "@engine-core/lib/ResourceEntityMapper"
import LocalizationEN from "@enums/LocalizationEN"
import {Inject, Injectable, LazyInject} from "@lib/Injection";
import EngineStore from "@lib/stores/EngineStore";
import LevelService from "@services/LevelService";
import ToasterService from "@services/ToasterService";
import IInjectable from "@lib/IInjectable";

@Injectable
export default class ExecutionService extends IInjectable{
    #currentLevelID
    #isPlaying = false
    cameraSerialization

    @Inject(EngineStore)
    static engineStore: EngineStore

    @Inject(Engine)
    static engine: Engine

    @LazyInject(LevelService)
    static levelService: LevelService

    @Inject(ToasterService)
    static toasterService: ToasterService
    
    async startPlayState() {
        if (this.#isPlaying || !ExecutionService.engine.loadedLevel) {
            ExecutionService.toasterService.error(LocalizationEN.NO_LEVEL_LOADED)
            return
        }
        ExecutionService.toasterService.warn(LocalizationEN.SAVING_STATE)

        this.cameraSerialization = ExecutionService.engine.CameraAPI.serializeState()
        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ExecutionService.levelService.saveCurrentLevel().catch(console.error)
        this.#currentLevelID = ExecutionService.engine.loadedLevel.id
        await ExecutionService.engine.startSimulation()
        ExecutionService.engineStore.updateStore({focusedCamera: undefined, executingAnimation: true})
    }

    async stopPlayState() {
        if (!this.#isPlaying)
            return
        ResourceEntityMapper.clear()

        ExecutionService.engine.entities.clear()
        ExecutionService.engine.queryMap.clear()

        ExecutionService.toasterService.log(LocalizationEN.RESTORING_STATE)
        this.#isPlaying = false
        ExecutionService.engine.environment = ENVIRONMENT.DEV

        UIAPI.destroyUI()
        await ExecutionService.levelService.loadLevel(this.#currentLevelID).catch(console.error)
        await ScriptsAPI.updateAllScripts()

        ExecutionService.engine.CameraAPI.trackingEntity = undefined
        CameraTracker.startTracking()
        ExecutionService.engineStore.updateStore({executingAnimation: false})
        ExecutionService.engine.CameraAPI.restoreState(this.cameraSerialization)
    }

}