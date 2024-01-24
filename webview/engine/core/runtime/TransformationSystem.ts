import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";

export default class TransformationSystem extends AbstractEngineSystem {
    static isChanged = false

    // TODO - JUST ACCESS THESE PROPERTIES DIRECTLY
    // static #getEntityInfo(entity: Entity): WorkerEntity {
    //     const parent = EntityQueryService.getClosestEntityParent(entity)
    //     const newEntity = <WorkerEntity>{
    //         id: entity.id,
    //         changedBuffer: entity.__changedBuffer,
    //         previousModelMatrix: entity.previousModelMatrix,
    //         matrix: <Float32Array>entity.matrix,
    //
    //         parentMatrix: <Float32Array | undefined>parent?.matrix,
    //         parentChangedBuffer: <Uint8Array | undefined>parent?.__changedBuffer,
    //         rotationQuaternion: <Float32Array>entity.rotationQuaternion,
    //         translation: <Float32Array>entity.translation,
    //         scaling: <Float32Array>entity.scaling,
    //         pivotPoint: <Float32Array>entity.pivotPoint,
    //         baseTransformationMatrix: <Float32Array>entity.baseTransformationMatrix,
    //         absoluteTranslation: <Float32Array>entity.absoluteTranslation,
    //         cullingMetadata: <Float32Array>entity.__cullingMetadata,
    //         rotationType: <Float32Array>entity.rotationType,
    //         rotationEuler: <Float32Array>entity.rotationEuler,
    //         rotationQuaternionFinal: <Float32Array>entity.rotationQuaternionFinal,
    //     }
    //     entity.changed = true
    //     entity.hasWorkerBound = true
    //     return newEntity
    // }


    execute(gl: WebGL2RenderingContext) {
        TransformationSystem.isChanged = false

        // TODO
        // entityWorker()
    }
}

