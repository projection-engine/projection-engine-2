import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import Engine from "@engine-core/Engine";
import VisualsStore from "@lib/stores/VisualsStore";
import EditorFSUtil from "../window/editor/util/EditorFSUtil";
import EngineTools from "@engine-tools/EngineTools";
import UIAPI from "@engine-core/lib/rendering/UIAPI";
import GPU from "@engine-core/GPU";
import EngineToolsService from "@services/EngineToolsService";
import ViewportInteractionService from "../window/editor/views/scene-editor/lib/ViewportInteractionService";
import RENDER_TARGET from "../window/editor/static/RENDER_TARGET";

@Injectable
export default class CanvasContextService extends IInjectable {
    @Inject(Engine)
    static engine: Engine

    @Inject(VisualsStore)
    static visualsStore: VisualsStore

    #isInitialized = false

    async createCanvas() {
        if (this.#isInitialized) {
            return
        }
        this.#isInitialized = true
        const visualsData = CanvasContextService.visualsStore.getData();
        await CanvasContextService.engine.initialize(
            document.getElementById(RENDER_TARGET),
            {
                w: visualsData.resolutionX,
                h: visualsData.resolutionY
            },
            EditorFSUtil.readAsset,
            true
        )
        await EngineTools.initialize().catch(console.error)
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