import QueryAPI from "../../engine/core/lib/utils/QueryAPI"
import {vec3, vec4} from "gl-matrix"
import CameraAPI from "../../engine/core/lib/utils/CameraAPI"
import CameraTracker from "../../engine/tools/utils/CameraTracker"
import Engine from "../../engine/core/Engine"
import EngineStateService from "./EngineStateService"
import EntitySelectionStore from "../shared/stores/EntitySelectionStore";
import ProjectionEngine from "../ProjectionEngine";


export default class ViewportActionService {
    toCopy = []

    copy(single?: boolean, target?: string) {
        const selected = EntitySelectionStore.getEntitiesSelected()
        if (target)
            this.toCopy = [target]
        else if (single && selected[0])
            this.toCopy = [selected[0]]
        else
            this.toCopy = [...selected]
    }

    focus() {
        const entity = QueryAPI.getEntityByID(EntitySelectionStore.getMainEntity())
        if (!entity)
            return

        vec3.copy(Engine.CameraAPI.translationBuffer, entity.absoluteTranslation)

        const position = <vec4>[0, 0, 5, 1]
        vec4.transformQuat(position, position, Engine.CameraAPI.rotationBuffer)
        vec3.add(Engine.CameraAPI.translationBuffer, Engine.CameraAPI.translationBuffer, <vec3>position)

        CameraTracker.forceUpdate = true
    }

    deleteSelected() {
        EngineStateService.removeBlock(EntitySelectionStore.getEntitiesSelected())
    }

    invertSelection() {
        const newArr = []
        const notValid = {}
        const oldSelected = EntitySelectionStore.getEntitiesSelected()
        for (let i = 0; i < oldSelected.length; i++)
            notValid[oldSelected[i]] = true
        const entities = Engine.entities.array
        for (let i = 0; i < entities.length; i++) {
            if (!notValid[entities[i].id])
                newArr.push(entities[i].id)
        }

        EntitySelectionStore.setEntitiesSelected(newArr)
    }

    paste(parent?: string) {
        const block = []
        if (!this.toCopy)
            return
        const targetParent = parent ? QueryAPI.getEntityByID(parent) : undefined
        for (let i = 0; i < this.toCopy.length; i++) {
            const t = this.toCopy[i]
            const found = QueryAPI.getEntityByID(t)
            if (found) {
                if (targetParent === found)
                    continue
                const clone = found.clone()
                block.push(clone)
                if (!targetParent)
                    continue
                clone.addParent(targetParent)
            }
        }
        EngineStateService.appendBlock(block)
        ProjectionEngine.ToastNotificationSystem.log(`Pasted ${this.toCopy.length} entities.`)

    }

    group() {
        const selected = EntitySelectionStore.getEntitiesSelected()
        this.toCopy = selected
        if (selected.length > 1)
            EngineStateService.linkMultiple(selected)
    }

    selectAll() {
        EntitySelectionStore.setEntitiesSelected(Array.from(Engine.entities.keys()))
    }

    fixateActive() {
        const selected = EntitySelectionStore.getEntitiesSelected()
        if (selected[0])
            EntitySelectionStore.setLockedEntity(selected[0])
    }
}
