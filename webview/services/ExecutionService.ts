import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import GUIService from "@engine-core/services/GUIService"
import Engine from "@engine-core/Engine"
import Scripting from "@engine-core/core/Scripting"
import LocalizationEN from "@enums/LocalizationEN"
import {Inject, Injectable, LazyInject} from "@lib/Injection";
import ProjectService from "@services/ProjectService";
import ToasterService from "@services/ToasterService";
import IInjectable from "@lib/IInjectable";
import SettingsStore from "@lib/stores/SettingsStore";
import {SerializationPackage} from "@engine-core/engine-d";

@Injectable
export default class ExecutionService extends IInjectable{
    #isPlaying = false
    #worldCache: SerializationPackage
    #cameraCache: SerializationPackage

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

        this.#worldCache = ExecutionService.engine.getWorld().serialize();
        this.#cameraCache = ExecutionService.engine.getCamera().serialize();

        this.#isPlaying = true
        CameraTracker.stopTracking()
        await ExecutionService.engine.startSimulation()
        ExecutionService.settingsStore.updateStore({focusedCamera: undefined, executingAnimation: true})
    }

    async stopPlayState() {
        if (!this.#isPlaying) {
            return
        }

        ExecutionService.engine.setEnvironment(ENVIRONMENT.DEV)

        this.#isPlaying = false
        ExecutionService.toasterService.log(LocalizationEN.RESTORING_STATE)
        ExecutionService.engine.getCamera().parse(this.#cameraCache);

        ExecutionService.engine.getWorld().parse(this.#worldCache);

        GUIService.destroyUI()
        CameraTracker.startTracking()

        ExecutionService.settingsStore.updateStore({executingAnimation: false})
    }

}