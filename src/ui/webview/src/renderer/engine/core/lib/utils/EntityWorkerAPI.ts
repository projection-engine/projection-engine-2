import WORKER_MESSAGES from "../../static/WORKER_MESSAGES"
import CameraAPI from "./CameraAPI"
import Entity from "../../instances/Entity"
import QueryAPI from "./QueryAPI"
import entityWorker from "../../workers/entity-worker";

export default class EntityWorkerAPI {
    static hasChangeBuffer = new Uint8Array(new ArrayBuffer(1))

    static linkedEntities = new Map()
    static #initialized = false


    static updateEntityReference(entity: Entity) {
        EntityWorkerAPI.removeEntity(entity)
        EntityWorkerAPI.registerEntity(entity)
    }


    static initialize() {
        if (EntityWorkerAPI.#initialized)
            return
        EntityWorkerAPI.#initialized = true

        entityWorker({
            type: WORKER_MESSAGES.INITIALIZE,
            payload: [EntityWorkerAPI.hasChangeBuffer, CameraAPI.notificationBuffers, CameraAPI.position, 0, 1]
        })
    }


    static removeEntity(entity: Entity) {
        if (!entity.hasWorkerBound)
            return

        entityWorker({type: WORKER_MESSAGES.REMOVE_ENTITY, payload: entity.id})
        EntityWorkerAPI.linkedEntities.delete(entity.id)
        entity.hasWorkerBound = false
    }


    static removeBlock(entities: Entity[]) {
        const toRemove = []
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            if (entity.hasWorkerBound) {
                toRemove.push(entity.id)
                EntityWorkerAPI.linkedEntities.delete(entity.id)
                entity.hasWorkerBound = false
            }
        }


        entityWorker({type: WORKER_MESSAGES.REMOVE_ENTITY_BLOCK, payload: toRemove})

    }

    static #getEntityInfo(entity: Entity): WorkerEntity {
        const parent = QueryAPI.getClosestEntityParent(entity)
        const newEntity = <WorkerEntity>{
            id: entity.id,
            changedBuffer: entity.__changedBuffer,
            previousModelMatrix: entity.previousModelMatrix,
            matrix: <Float32Array>entity.matrix,

            parentMatrix: <Float32Array | undefined>parent?.matrix,
            parentChangedBuffer: <Uint8Array | undefined>parent?.__changedBuffer,
            rotationQuaternion: <Float32Array>entity.rotationQuaternion,
            translation: <Float32Array>entity.translation,
            scaling: <Float32Array>entity.scaling,
            pivotPoint: <Float32Array>entity.pivotPoint,
            baseTransformationMatrix: <Float32Array>entity.baseTransformationMatrix,
            absoluteTranslation: <Float32Array>entity.absoluteTranslation,
            cullingMetadata: <Float32Array>entity.__cullingMetadata,
            rotationType: <Float32Array>entity.rotationType,
            rotationEuler: <Float32Array>entity.rotationEuler,
            rotationQuaternionFinal: <Float32Array>entity.rotationQuaternionFinal,
        }
        entity.changed = true
        entity.hasWorkerBound = true
        return newEntity
    }

    static registerEntity(entity: Entity) {
        if (entity.isCollection || !EntityWorkerAPI.#initialized || (entity.hasWorkerBound && EntityWorkerAPI.linkedEntities.get(entity.id)))
            return
        EntityWorkerAPI.linkedEntities.set(entity.id, entity)
        entityWorker({
            type: WORKER_MESSAGES.REGISTER_ENTITY,
            payload: EntityWorkerAPI.#getEntityInfo(entity)
        })
    }

    static registerBlock(entities: Entity[]) {
        if (!EntityWorkerAPI.#initialized)
            return
        for (let i = 0; i < entities.length; i++) {
            const e = entities[i]
            if (e.hasWorkerBound || e.isCollection)
                continue
            EntityWorkerAPI.linkedEntities.set(e.id, e)
            entityWorker({
                type: WORKER_MESSAGES.REGISTER_ENTITY,
                payload: EntityWorkerAPI.#getEntityInfo(e)
            })
        }
    }

    static syncThreads() {
        entityWorker()
    }
}

