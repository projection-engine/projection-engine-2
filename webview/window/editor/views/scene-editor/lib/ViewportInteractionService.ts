import Engine from "../../../../../engine/core/Engine"
import GPU from "../../../../../engine/core/GPU"
import ViewportUtil from "../../../util/ViewportUtil"
import GizmoState from "../../../../../engine/tools/gizmo/util/GizmoState"
import GizmoMouseUtil from "../../../../../engine/tools/gizmo/util/GizmoMouseUtil"
import EngineTools from "../../../../../engine/tools/EngineTools";
import EntitySelectionStore from "../../../../shared/stores/EntitySelectionStore";
import ProjectionEngine from "../../../../ProjectionEngine";


export default class ViewportInteractionService {
    static #mouseDelta = {x: 0, y: 0}
    static #LEFT_BUTTON = 0

    static initialize() {
        GPU.canvas.addEventListener("mousedown", this.#onMouseDown.bind(this))
        document.addEventListener("mouseup", this.#onMouseUp.bind(this))
        document.addEventListener("mousemove", EngineTools.onMouseMove)
    }

    static onDestroy() {
        GPU.canvas.removeEventListener("mousedown", this.#onMouseDown.bind(this))
        document.removeEventListener("mouseup", this.#onMouseUp.bind(this))
        document.removeEventListener("mousemove", EngineTools.onMouseMove)
    }


    static #onMouseDown(e) {
        if (!Engine.isReady || e.button !== ViewportInteractionService.#LEFT_BUTTON)
            return
        ViewportInteractionService.#mouseDelta = {x: e.clientX, y: e.clientY}

        GizmoMouseUtil.onMouseDown(e)

    }

    static #onMouseUp(event) {
        GizmoMouseUtil.onMouseUp()

        if (!Engine.isReady)
            return
        ViewportUtil.onViewportClick(
            event,
            ViewportInteractionService.#mouseDelta,
            ProjectionEngine.SettingsStore.getData(),
            (data) => {
                if (GizmoState.wasOnGizmo) {
                    GizmoState.wasOnGizmo = false
                    return
                }
                EntitySelectionStore.setEntitiesSelected(data)
            })
    }
}
