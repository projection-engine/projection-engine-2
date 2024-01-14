import GPU from "../GPU"
import StaticFBO from "../lib/StaticFBO"
import StaticShaders from "../lib/StaticShaders"
import ResourceEntityMapper from "../lib/ResourceEntityMapper"
import MATERIAL_RENDERING_TYPES from "../static/MATERIAL_RENDERING_TYPES"
import MetricsController from "../lib/utils/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import AbstractSystem from "@engine-core/AbstractSystem";


export default class DirectionalShadowsSystem extends AbstractSystem {
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
        const toRender = ResourceEntityMapper.meshes.array
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