import CameraTracker from "../../../engine/tools/utils/CameraTracker"
import Engine from "@engine-core/Engine"
import GPU from "@engine-core/GPU"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import VisibilityRenderer from "@engine-core/runtime/VisibilityRenderer"
import EngineTools from "../../../engine/tools/EngineTools"
import StaticFBO from "@engine-core/lib/StaticFBO";
import EntitySelectionStore from "@lib/stores/EntitySelectionStore";
import ProjectionEngine from "@lib/ProjectionEngine";
import {ViewType} from "../components/view/ViewDefinitions";

export default class ViewportUtil {
    static updateViewport(currentView: ViewType) {
        if (ProjectionEngine.EngineStore.getData().focusedCamera || !GPU.context)
            return
        if (currentView === ViewType.EDITOR) {
            CameraTracker.startTracking()
            ProjectionEngine.Engine.start()
        } else {
            CameraTracker.stopTracking()
            ProjectionEngine.Engine.stop()
        }
    }

    static onViewportClick(event, mouseDelta, settings, setContext) {
        const MAX_DELTA = 50, LEFT_BUTTON = 0
        if (GPU.canvas !== event.target || event.button !== LEFT_BUTTON)
            return
        const deltaX = Math.abs(mouseDelta.x - event.clientX)
        const deltaY = Math.abs(mouseDelta.y - event.clientY)
        if (deltaX >= MAX_DELTA || deltaY >= MAX_DELTA)
            return
        const selected = EntitySelectionStore.getEntitiesSelected()
        EngineTools.drawIconsToBuffer()

        const clickedEntity = PickingAPI.readEntityID(event.clientX, event.clientY, 1, StaticFBO.visibility.FBO)
        const entity = QueryAPI.getEntityByPickerID(clickedEntity)

        if (!entity) {
            setContext([])
            return
        }

        if (event.ctrlKey) {
            if (selected.find(e => e === entity.id))
                setContext(selected.filter(s => s !== entity.id))
            else
                setContext([...selected, entity.id])
        } else
            setContext([entity.id])

        VisibilityRenderer.needsUpdate = true
    }

}
