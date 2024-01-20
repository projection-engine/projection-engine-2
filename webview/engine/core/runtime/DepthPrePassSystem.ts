import {mat4} from "gl-matrix"
import StaticShaders from "../repositories/StaticShaders"
import StaticFBO from "../repositories/StaticFBO"
import ResourceEntityMapper from "../repositories/ResourceEntityMapper"
import StaticMeshes from "../repositories/StaticMeshes"
import MATERIAL_RENDERING_TYPES from "../static/MATERIAL_RENDERING_TYPES"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import MotionBlurSystem from "./MotionBlurSystem"
import loopMeshes from "./loop-meshes"
import Entity from "../instances/Entity"
import Mesh from "../instances/Mesh"
import ProjectionEngine from "@lib/ProjectionEngine";
import IEngineSystem from "@engine-core/IEngineSystem";

const entityMetadata = new Float32Array(16)
let uniforms, VP
export default class DepthPrePassSystem extends IEngineSystem {
    static needsUpdate = true

    execute(gl: WebGL2RenderingContext) {
        StaticShaders.visibility.bind()
        StaticFBO.visibility.startMapping()
        this.#bindUniforms(gl)
        entityMetadata[5] = 0
        loopMeshes((entity, mesh) => this.#drawMesh(gl, entity, mesh))

        this.#drawSprites(gl)
        StaticFBO.visibility.stopMapping()
        MetricsController.currentState = METRICS_FLAGS.VISIBILITY
    }

    #drawSprites(gl: WebGL2RenderingContext) {
        const toRender = ResourceEntityMapper.sprites.array
        const size = toRender.length
        if (size === 0)
            return
        entityMetadata[5] = 1 // IS SPRITE

        gl.disable(gl.CULL_FACE)
        for (let i = 0; i < size; i++) {
            const entity = toRender[i]
            const culling = entity.cullingComponent
            const sprite = entity.spriteComponent
            const hasScreenDoor = culling && culling.screenDoorEnabled && culling.screenDoorEffect
            if (entity.isCulled || !entity.active || hasScreenDoor)
                continue

            entityMetadata[0] = entity.pickID[0]
            entityMetadata[1] = entity.pickID[1]
            entityMetadata[2] = entity.pickID[2]

            entityMetadata[4] = hasScreenDoor ? 1 : 0

            entityMetadata[8] = sprite.attributes[0]
            entityMetadata[9] = sprite.attributes[1]

            entityMetadata[12] = entity.scaling[0]
            entityMetadata[13] = entity.scaling[1]
            entityMetadata[14] = entity.scaling[2]

            gl.uniformMatrix4fv(uniforms.metadata, false, entityMetadata)
            gl.uniformMatrix4fv(uniforms.modelMatrix, false, entity.matrix)
            gl.uniformMatrix4fv(uniforms.previousModelMatrix, false, entity.previousModelMatrix)

            StaticMeshes.drawQuad()
        }
        gl.enable(gl.CULL_FACE)
    }

    #drawMesh(gl: WebGL2RenderingContext, entity: Entity, mesh: Mesh) {

        const culling = entity.cullingComponent
        const hasScreenDoor = culling && culling.screenDoorEnabled && culling.screenDoorEffect

        entityMetadata[0] = entity.pickID[0]
        entityMetadata[1] = entity.pickID[1]
        entityMetadata[2] = entity.pickID[2]
        entityMetadata[4] = hasScreenDoor || entity.materialRef?.renderingMode === MATERIAL_RENDERING_TYPES.TRANSPARENCY ? 1 : 0

        gl.uniformMatrix4fv(uniforms.metadata, false, entityMetadata)
        gl.uniformMatrix4fv(uniforms.modelMatrix, false, entity.matrix)
        if (MotionBlurSystem.enabled)
            gl.uniformMatrix4fv(uniforms.previousModelMatrix, false, entity.previousModelMatrix)

        mesh.simplifiedDraw()
    }

    #bindUniforms(gl: WebGL2RenderingContext) {
        uniforms = StaticShaders.visibilityUniforms
        VP = ProjectionEngine.Engine.getCamera().cameraMotionBlur ? ProjectionEngine.Engine.getCamera().previousViewProjectionMatrix : ProjectionEngine.Engine.getCamera().viewProjectionMatrix
        gl.uniformMatrix4fv(uniforms.viewProjection, false, ProjectionEngine.Engine.getCamera().viewProjectionMatrix)
        gl.uniformMatrix4fv(uniforms.previousViewProjection, false, VP)
        gl.uniformMatrix4fv(uniforms.viewMatrix, false, ProjectionEngine.Engine.getCamera().viewMatrix)
        gl.uniform3fv(uniforms.cameraPlacement, ProjectionEngine.Engine.getCamera().position)
        mat4.copy(ProjectionEngine.Engine.getCamera().previousViewProjectionMatrix, ProjectionEngine.Engine.getCamera().viewProjectionMatrix)
    }

}