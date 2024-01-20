import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import Engine from "@engine-core/Engine";
import EditorFSUtil from "../window/editor/util/EditorFSUtil";
import EngineTools from "@engine-tools/EngineTools";
import UIAPI from "@engine-core/services/UIAPI";
import GPU from "@engine-core/GPU";
import EngineToolsService from "@services/EngineToolsService";
import ViewportInteractionService from "../window/editor/views/scene-editor/lib/ViewportInteractionService";
import RENDER_TARGET from "../window/editor/static/RENDER_TARGET";
import SettingsStore from "@lib/stores/SettingsStore";

@Injectable
export default class CanvasContextService extends IInjectable {
    @Inject(Engine)
    static engine: Engine

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    #isInitialized = false

    async createCanvas() {
        if (this.#isInitialized) {
            return
        }
        this.#isInitialized = true
        const visualsData = CanvasContextService.settingsStore.getData();
        await CanvasContextService.engine.initialize(
            document.getElementById(RENDER_TARGET) as HTMLCanvasElement,
            {
                w: visualsData.resolutionX,
                h: visualsData.resolutionY
            },
            EditorFSUtil.readAsset,
            true
        )
        await CanvasContextService.engine.addSystem(EngineTools);
        UIAPI.buildUI(GPU.canvas.parentElement)
        UIAPI.hideUI()
        EngineToolsService.initialize()
        ViewportInteractionService.initialize()
    }

    moveCanvas(target: HTMLElement) {
        if (!this.#isInitialized) {
            return
        }
        const canvas = document.getElementById(RENDER_TARGET).parentElement;
        canvas.parentElement.removeChild(canvas)
        target.appendChild(canvas)
    }
}