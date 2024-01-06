import ENVIRONMENT from "../../engine/core/static/ENVIRONMENT"
import CameraTracker from "../../engine/tools/utils/CameraTracker"
import UIAPI from "../../engine/core/lib/rendering/UIAPI"
import Engine from "../../engine/core/Engine"
import CameraAPI from "../../engine/core/lib/utils/CameraAPI"
import ScriptsAPI from "../../engine/core/lib/utils/ScriptsAPI"

import ResourceEntityMapper from "../../engine/core/resource-libs/ResourceEntityMapper"
import LocalizationEN from "../../enums/LocalizationEN"
import ProjectionEngine from "../ProjectionEngine";

export default class ExecutionService {
    #currentLevelID
    #isPlaying = false
    cameraSerialization

    async startPlayState() {
        if (this.#isPlaying || !Engine.loadedLevel) {
            ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.NO_LEVEL_LOADED)
            return
        }
        ProjectionEngine.ToastNotificationSystem.warn(LocalizationEN.SAVING_STATE)

        this.cameraSerialization = Engine.CameraAPI.serializeState()
        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ProjectionEngine.LevelService.saveCurrentLevel().catch(console.error)
        this.#currentLevelID = Engine.loadedLevel.id
        await Engine.startSimulation()
        ProjectionEngine.EngineStore.updateStore({focusedCamera: undefined, executingAnimation: true})
    }

    async stopPlayState() {
        if (!this.#isPlaying)
            return
        ResourceEntityMapper.clear()

        Engine.entities.clear()
        Engine.queryMap.clear()

        ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.RESTORING_STATE)
        this.#isPlaying = false
        Engine.environment = ENVIRONMENT.DEV

        UIAPI.destroyUI()
        await ProjectionEngine.LevelService.loadLevel(this.#currentLevelID).catch(console.error)
        await ScriptsAPI.updateAllScripts()

        Engine.CameraAPI.trackingEntity = undefined
        CameraTracker.startTracking()
        ProjectionEngine.EngineStore.updateStore({executingAnimation: false})
        Engine.CameraAPI.restoreState(this.cameraSerialization)
    }

}