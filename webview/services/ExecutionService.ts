import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import UIAPI from "@engine-core/lib/rendering/UIAPI"
import Engine from "@engine-core/Engine"
import ScriptsAPI from "@engine-core/lib/utils/ScriptsAPI"
import ResourceEntityMapper from "@engine-core/lib/ResourceEntityMapper"
import LocalizationEN from "@enums/LocalizationEN"
import {Inject, Injectable, LazyInject} from "@lib/Injection";
import ProjectService from "@services/ProjectService";
import ToasterService from "@services/ToasterService";
import IInjectable from "@lib/IInjectable";
import SettingsStore from "@lib/stores/SettingsStore";

@Injectable
export default class ExecutionService extends IInjectable{
    #isPlaying = false
    cameraSerialization

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    @Inject(Engine)
    static engine: Engine

    @LazyInject(ProjectService)
    static levelService: ProjectService

    @Inject(ToasterService)
    static toasterService: ToasterService
    
    async startPlayState() {
        if (this.#isPlaying) {
            return
        }
        ExecutionService.toasterService.warn(LocalizationEN.SAVING_STATE)

        this.cameraSerialization = ExecutionService.engine.camera.serializeState()
        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ExecutionService.engine.startSimulation()
        ExecutionService.settingsStore.updateStore({focusedCamera: undefined, executingAnimation: true})
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
        await ScriptsAPI.updateAllScripts()

        ExecutionService.engine.camera.trackingEntity = undefined
        CameraTracker.startTracking()
        ExecutionService.settingsStore.updateStore({executingAnimation: false})
        ExecutionService.engine.camera.restoreState(this.cameraSerialization)
    }

}