import ENVIRONMENT from "../../../../engine-core/static/ENVIRONMENT";

import EngineStore from "../../../shared/stores/EngineStore";
import CameraTracker from "../../../../engine-tools/lib/CameraTracker";
import UIAPI from "../../../../engine-core/lib/rendering/UIAPI";
import PhysicsAPI from "../../../../engine-core/lib/rendering/PhysicsAPI";
import Engine from "../../../../engine-core/Engine";
import serializeStructure from "../../../../engine-core/utils/serialize-structure";
import EntityAPI from "../../../../engine-core/lib/utils/EntityAPI";
import CameraAPI from "../../../../engine-core/lib/utils/CameraAPI";
import ScriptsAPI from "../../../../engine-core/lib/utils/ScriptsAPI";
import AlertController from "../../../shared/components/alert/AlertController";
import LOCALIZATION_EN from "../../../../static/objects/LOCALIZATION_EN";
import EntityManager from "../EntityManager";
import ResourceEntityMapper from "../../../../engine-core/resource-libs/ResourceEntityMapper";
import QueryAPI from "../../../../engine-core/lib/utils/QueryAPI";
import LevelController from "../utils/LevelController";

export default class EntityStateController {
    static #currentLevelID
    static #isPlaying = false
    static cameraSerialization

    static async startPlayState() {
        if (EntityStateController.#isPlaying || !Engine.loadedLevel) {
            AlertController.error(LOCALIZATION_EN.NO_LEVEL_LOADED)
            return
        }
        AlertController.warn(LOCALIZATION_EN.SAVING_STATE)

        EntityStateController.cameraSerialization = CameraAPI.serializeState()
        EntityStateController.#isPlaying = true
        CameraTracker.stopTracking()
        await LevelController.saveCurrentLevel().catch()
        EntityStateController.#currentLevelID = Engine.loadedLevel.id
        await Engine.startSimulation()
        EngineStore.updateStore({...EngineStore.engine, focusedCamera: undefined, executingAnimation: true})
    }

    static async stopPlayState() {
        if (!EntityStateController.#isPlaying)
            return
        ResourceEntityMapper.clear()

        Engine.entities.clear()
        Engine.queryMap.clear()

        AlertController.log(LOCALIZATION_EN.RESTORING_STATE)
        EntityStateController.#isPlaying = false
        Engine.environment = ENVIRONMENT.DEV

        UIAPI.destroyUI()
        await LevelController.loadLevel(EntityStateController.#currentLevelID).catch()
        await ScriptsAPI.updateAllScripts()

        CameraAPI.trackingEntity = undefined
        CameraTracker.startTracking()
        EngineStore.updateStore({...EngineStore.engine, executingAnimation: false})
        CameraAPI.restoreState(EntityStateController.cameraSerialization)
    }

}