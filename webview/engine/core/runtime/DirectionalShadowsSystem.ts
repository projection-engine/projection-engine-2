import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import World from "../repositories/World"
import MATERIAL_RENDERING_TYPES from "../static/MATERIAL_RENDERING_TYPES"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import Components from "@engine-core/static/Components";


export default class DirectionalShadowsSystem extends AbstractEngineSystem {
    static changed = false
    static resolutionPerTexture = 1024
    static maxResolution = 4096
    static lightsToUpdate = []
    static atlasRatio = 0


    // TODO - REFACTOR THIS METHOD
    execute(gl: WebGL2RenderingContext) {
        const lightsToUpdate = DirectionalShadowsSystem.lightsToUpdate
        if (!DirectionalShadowsSystem.changed && lightsToUpdate.length === 0)
            return
        gl.cullFace(gl.FRONT)
        let currentColumn = 0, currentRow = 0

        StaticFBO.shadows.startMapping()
        gl.enable(gl.SCISSOR_TEST)
        const size = DirectionalShadowsSystem.atlasRatio ** 2
        for (let face = 0; face < size; face++) {
            if (face < lightsToUpdate.length) {
                const currentLight = lightsToUpdate[face]

                gl.viewport(
                    currentColumn * DirectionalShadowsSystem.resolutionPerTexture,
                    currentRow * DirectionalShadowsSystem.resolutionPerTexture,
                    DirectionalShadowsSystem.resolutionPerTexture,
                    DirectionalShadowsSystem.resolutionPerTexture
                )
                gl.scissor(
                    currentColumn * DirectionalShadowsSystem.resolutionPerTexture,
                    currentRow * DirectionalShadowsSystem.resolutionPerTexture,
                    DirectionalShadowsSystem.resolutionPerTexture,
                    DirectionalShadowsSystem.resolutionPerTexture
                )

                currentLight.atlasFace = [currentColumn, 0]
                this.loopMeshes(gl, currentLight)
            }
            if (currentColumn > DirectionalShadowsSystem.atlasRatio) {
                currentColumn = 0
                currentRow += 1
            } else
                currentColumn += 1
        }
        gl.disable(gl.SCISSOR_TEST)
        StaticFBO.shadows.stopMapping()
        gl.cullFace(gl.BACK)
        DirectionalShadowsSystem.changed = false
        lightsToUpdate.length = 0
        MetricsController.currentState = METRICS_FLAGS.DIRECTIONAL_SHADOWS
    }

    loopMeshes(gl: WebGL2RenderingContext, light) {
        if (!light.entity)
            return
        const toRender = this.engine.getByComponent(Components.MESH)
        const size = toRender.length
        for (let m = 0; m < size; m++) {
            const current = toRender[m], meshComponent = current.meshComponent
            const mesh = current.meshRef
            if (!mesh || !meshComponent.castsShadows || !current.active || current.materialRef?.renderingMode === MATERIAL_RENDERING_TYPES.SKY)
                continue
            StaticShaders.directShadows.bind()
            const U = StaticShaders.directShadowsUniforms

            gl.uniformMatrix4fv(U.viewMatrix, false, light.__lightView)
            gl.uniformMatrix4fv(U.transformMatrix, false, current.matrix)
            gl.uniformMatrix4fv(U.projectionMatrix, false, light.__lightProjection)

            mesh.draw()
        }
    }

}