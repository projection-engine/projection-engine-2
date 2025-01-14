import EntityQueryService from "@engine-core/services/EntityQueryService"
import {vec3, vec4} from "gl-matrix"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import EngineStateService from "./EngineStateService"
import SelectionStore from "@lib/stores/SelectionStore";
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import IInjectable from "@lib/IInjectable";


@Injectable
export default class ViewportActionService extends IInjectable{
    toCopy = []

    copy(single?: boolean, target?: string) {
        const selected = SelectionStore.getEntitiesSelected()
        if (target)
            this.toCopy = [target]
        else if (single && selected[0])
            this.toCopy = [selected[0]]
        else
            this.toCopy = [...selected]
    }

    focus() {
        const entity = EntityQueryService.getEntityByID(SelectionStore.getMainEntity())
        if (!entity)
            return

        vec3.copy(ProjectionEngine.Engine.getCamera().translationBuffer, entity.absoluteTranslation)

        const position = <vec4>[0, 0, 5, 1]
        vec4.transformQuat(position, position, ProjectionEngine.Engine.getCamera().rotationBuffer)
        vec3.add(ProjectionEngine.Engine.getCamera().translationBuffer, ProjectionEngine.Engine.getCamera().translationBuffer, <vec3>position)

        CameraTracker.forceUpdate = true
    }

    deleteSelected() {
        EngineStateService.removeBlock(SelectionStore.getEntitiesSelected())
    }

    invertSelection() {
        const newArr = []
        const notValid = {}
        const oldSelected = SelectionStore.getEntitiesSelected()
        for (let i = 0; i < oldSelected.length; i++)
            notValid[oldSelected[i]] = true
        const entities = ProjectionEngine.Engine.getEntities().array
        for (let i = 0; i < entities.length; i++) {
            if (!notValid[entities[i].id])
                newArr.push(entities[i].id)
        }

        SelectionStore.setEntitiesSelected(newArr)
    }

    paste(parent?: string) {
        const block = []
        if (!this.toCopy)
            return
        const targetParent = parent ? EntityQueryService.getEntityByID(parent) : undefined
        for (let i = 0; i < this.toCopy.length; i++) {
            const t = this.toCopy[i]
            const found = EntityQueryService.getEntityByID(t)
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
        const selected = SelectionStore.getEntitiesSelected()
        this.toCopy = selected
        if (selected.length > 1)
            EngineStateService.linkMultiple(selected)
    }

    selectAll() {
        SelectionStore.setEntitiesSelected(Array.from(ProjectionEngine.Engine.getEntities().keys()))
    }

    fixateActive() {
        const selected = SelectionStore.getEntitiesSelected()
        if (selected[0])
            SelectionStore.setLockedEntity(selected[0])
    }
}
