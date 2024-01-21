import Engine from "@engine-core/Engine"
import AXIS from "@engine-tools/static/AXIS"
import EntityAPI from "@engine-core/services/EntityAPI"
import SelectionStore from "@lib/stores/SelectionStore"
import Entity from "@engine-core/instances/Entity"
import PickingAPI from "@engine-core/services/PickingAPI"

import QueryAPI from "@engine-core/services/QueryAPI"
import LocalizationEN from "@enums/LocalizationEN"
import GizmoUtil from "@engine-tools/gizmo/util/GizmoUtil"
import ProjectionEngine from "@lib/ProjectionEngine";
import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import EntityNamingService from "@services/EntityNamingService";
import EntityHierarchyService from "@services/EntityHierarchyService";


// TODO - REMOVE STATIC MEMBERS
@Injectable
export default class EngineStateService extends IInjectable {

    @Inject(SelectionStore)
    static selectionStore: SelectionStore

    @Inject(EntityNamingService)
    static entityNamingService: EntityNamingService

    @Inject(EntityHierarchyService)
    static entityHierarchyService: EntityHierarchyService

    @Inject(Engine)
    static engine: Engine

    static updateStructure(replacedMap?: { [key: string]: boolean }) {
        const arr = EngineStateService.engine.getEntities().array
        for (let i = 0; i < arr.length; i++) {
            const entity = arr[i]
            entity.setPickID(PickingAPI.getPickerId(i + AXIS.ZY + 1))
            if (!entity.parentID && !replacedMap?.[entity.parent?.id])
                continue
            if (entity.parent && !replacedMap?.[entity.parent?.id])
                entity.parentID = entity.parent.id
            const parent = EngineStateService.engine.getEntities().get(entity.parentID)
            if (parent) {
                entity.parentID = undefined
                entity.addParent(parent)
            }
        }

        EngineStateService.entityHierarchyService.updateHierarchy()
    }

    static appendBlock(block: Entity[]) {
        EntityAPI.addGroup(block)
        EngineStateService.entityNamingService.renameInBlock(block)
        for (let i = 0; i < block.length; i++)
            GizmoUtil.createTransformationCache(block[i])
        EngineStateService.updateStructure()
    }

    static removeBlock(payload: string[]) {
        const hierarchy: { [key: string]: Entity } = {}
        for (let i = 0; i < payload.length; i++) {
            const entity = EngineStateService.engine.getEntities().get(payload[i])
            if (!entity)
                continue
            hierarchy[entity.id] = entity
            QueryAPI.getHierarchyToObject(entity, hierarchy)
        }

        const entities = Object.values(hierarchy)
        EntityAPI.removeGroup(entities, false)

        EngineStateService.selectionStore.updateStore({
            array: []
        })
        SelectionStore.setLockedEntity(EngineStateService.engine.getEntities().array[0]?.id)
        EngineStateService.updateStructure()
    }

    static add(entity: Entity) {
        EngineStateService.entityNamingService.renameEntity(entity.name, entity)
        GizmoUtil.createTransformationCache(entity)
        EntityAPI.addEntity(entity)
        EngineStateService.selectionStore.updateStore({
            array: [entity.id]
        })
        SelectionStore.setLockedEntity(entity.id)
        EngineStateService.updateStructure()
    }

    static linkMultiple(payload: string[]) {
        const values = EngineStateService.engine.getEntities().array
        for (let i = 0; i < values.length; i++) {
            const s = values[i]
            if (payload.indexOf(s.id) > 0) {
                const found = EngineStateService.engine.getEntities().get(payload[0])
                s.addParent(found)
            }
        }
        EngineStateService.updateStructure()
    }
}
