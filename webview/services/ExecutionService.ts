import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import GUIService from "@engine-core/services/GUIService"
import Engine from "@engine-core/Engine"
import ScriptsAPI from "@engine-core/services/ScriptsAPI"
import ResourceEntityMapper from "@engine-core/repositories/ResourceEntityMapper"
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

        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ExecutionService.engine.startSimulation()
        ExecutionService.settingsStore.updateStore({focusedCamera: undefined, executingAnimation: true})
    }

    async stopPlayState() {
        if (!this.#isPlaying)
            return
        ResourceEntityMapper.clear()

        ExecutionService.engine.getEntities().clear()
        ExecutionService.engine.getQueryMap().clear()

        ExecutionService.toasterService.log(LocalizationEN.RESTORING_STATE)
        this.#isPlaying = false
        ExecutionService.engine.setEnvironment(ENVIRONMENT.DEV)

        GUIService.destroyUI()
        await ScriptsAPI.updateAllScripts()

        ExecutionService.engine.getCamera().trackingEntity = undefined
        CameraTracker.startTracking()
        ExecutionService.settingsStore.updateStore({executingAnimation: false})
        // ExecutionService.engine.getCamera().restoreState(this.cameraSerialization)
    }

}