import Engine from "@engine-core/Engine"
import AXIS from "../../engine/tools/static/AXIS"
import EntityAPI from "@engine-core/lib/utils/EntityAPI"
import EntitySelectionStore from "@lib/stores/EntitySelectionStore"
import Entity from "@engine-core/instances/Entity"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"

import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import LocalizationEN from "@enums/LocalizationEN"
import GizmoUtil from "../../engine/tools/gizmo/util/GizmoUtil"
import ProjectionEngine from "@lib/ProjectionEngine";


function checkLevel(_, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args) {
        if (!ProjectionEngine.Engine.loadedLevel) {
            ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.NO_LEVEL_LOADED)
            return
        }
        return original.call(this, ...args)
    }
}


export default class EngineStateService {
    static #updateStructure(replacedMap?: { [key: string]: boolean }) {
        const arr = ProjectionEngine.Engine.entities.array
        for (let i = 0; i < arr.length; i++) {
            const entity = arr[i]
            entity.setPickID(PickingAPI.getPickerId(i + AXIS.ZY + 1))
            if (!entity.parentID && !replacedMap?.[entity.parent?.id])
                continue
            if (entity.parent && !replacedMap?.[entity.parent?.id])
                entity.parentID = entity.parent.id
            const parent = ProjectionEngine.Engine.entities.get(entity.parentID)
            if (parent) {
                entity.parentID = undefined
                entity.addParent(parent)
            }
        }

        ProjectionEngine.EntityHierarchyService.updateHierarchy()
    }

    @checkLevel
    static replaceBlock(toRemove: string[], toAdd: Entity[]) {

        const replacedMap = {}
        EngineStateService.removeBlock(toRemove)
        for (let i = 0; i < toAdd.length; i++) {
            const entity = toAdd[i]
            EntityAPI.addEntity(entity)
            replacedMap[entity.id] = true
            ProjectionEngine.EntityNamingService.renameEntity(entity.name, entity)
        }
        EngineStateService.#updateStructure(replacedMap)
    }

    @checkLevel
    static appendBlock(block: Entity[]) {
        EntityAPI.addGroup(block)
        ProjectionEngine.EntityNamingService.renameInBlock(block)
        for (let i = 0; i < block.length; i++)
            GizmoUtil.createTransformationCache(block[i])
        EngineStateService.#updateStructure()
    }

    @checkLevel
    static removeBlock(payload: string[]) {
        const hierarchy: { [key: string]: Entity } = {}
        for (let i = 0; i < payload.length; i++) {
            const entity = ProjectionEngine.Engine.entities.get(payload[i])
            if (!entity)
                continue
            hierarchy[entity.id] = entity
            QueryAPI.getHierarchyToObject(entity, hierarchy)
        }

        const entities = Object.values(hierarchy)
        EntityAPI.removeGroup(entities, false)

        ProjectionEngine.EntitySelectionStore.updateStore({
            array: []
        })
        EntitySelectionStore.setLockedEntity(ProjectionEngine.Engine.entities.array[0]?.id)
        EngineStateService.#updateStructure()
    }

    @checkLevel
    static add(entity: Entity) {
        ProjectionEngine.EntityNamingService.renameEntity(entity.name, entity)
        GizmoUtil.createTransformationCache(entity)
        EntityAPI.addEntity(entity)
        ProjectionEngine.EntitySelectionStore.updateStore({
            array: [entity.id]
        })
        EntitySelectionStore.setLockedEntity(entity.id)
        EngineStateService.#updateStructure()
    }

    @checkLevel
    static linkMultiple(payload: string[]) {
        const values = ProjectionEngine.Engine.entities.array
        for (let i = 0; i < values.length; i++) {
            const s = values[i]
            if (payload.indexOf(s.id) > 0) {
                const found = ProjectionEngine.Engine.entities.get(payload[0])
                s.addParent(found)
            }
        }
        EngineStateService.#updateStructure()
    }
}
