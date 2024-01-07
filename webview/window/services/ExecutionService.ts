import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import CameraTracker from "../../engine/tools/utils/CameraTracker"
import UIAPI from "@engine-core/lib/rendering/UIAPI"
import Engine from "@engine-core/Engine"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import ScriptsAPI from "@engine-core/lib/utils/ScriptsAPI"

import ResourceEntityMapper from "@engine-core/lib/ResourceEntityMapper"
import LocalizationEN from "@enums/LocalizationEN"
import ProjectionEngine, {Injectable} from "@lib/ProjectionEngine";

@Injectable
export default class ExecutionService {
    #currentLevelID
    #isPlaying = false
    cameraSerialization

    async startPlayState() {
        if (this.#isPlaying || !ProjectionEngine.Engine.loadedLevel) {
            ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.NO_LEVEL_LOADED)
            return
        }
        ProjectionEngine.ToastNotificationSystem.warn(LocalizationEN.SAVING_STATE)

        this.cameraSerialization = ProjectionEngine.Engine.CameraAPI.serializeState()
        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ProjectionEngine.LevelService.saveCurrentLevel().catch(console.error)
        this.#currentLevelID = ProjectionEngine.Engine.loadedLevel.id
        await ProjectionEngine.Engine.startSimulation()
        ProjectionEngine.EngineStore.updateStore({focusedCamera: undefined, executingAnimation: true})
    }

    async stopPlayState() {
        if (!this.#isPlaying)
            return
        ResourceEntityMapper.clear()

        ProjectionEngine.Engine.entities.clear()
        ProjectionEngine.Engine.queryMap.clear()

        ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.RESTORING_STATE)
        this.#isPlaying = false
        ProjectionEngine.Engine.environment = ENVIRONMENT.DEV

        UIAPI.destroyUI()
        await ProjectionEngine.LevelService.loadLevel(this.#currentLevelID).catch(console.error)
        await ScriptsAPI.updateAllScripts()

        ProjectionEngine.Engine.CameraAPI.trackingEntity = undefined
        CameraTracker.startTracking()
        ProjectionEngine.EngineStore.updateStore({executingAnimation: false})
        ProjectionEngine.Engine.CameraAPI.restoreState(this.cameraSerialization)
    }

}