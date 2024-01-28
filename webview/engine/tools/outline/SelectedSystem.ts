import GPU from "@engine-core/core/GPU"

import StaticMeshRepository from "@engine-core/repositories/StaticMeshRepository"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository"
import EngineTools from "../EngineTools"
import EngineToolsState from "../EngineToolsState"
import ShaderRepository from "@engine-core/repositories/ShaderRepository";

const fallbackColor = new Float32Array([.5, .5, .5])
const metadata = new Float32Array(9)
export default class SelectedSystem {
    static drawToBuffer() {
        const selected = EngineTools.selected
        const length = selected.length
        const context = GPU.context

        if (length > 0) {
            FramebufferRepository.postProcessing1.startMapping()
            ShaderRepository.silhouette.bind()
            const uniforms = ShaderRepository.silhouetteUniforms
            for (let m = 0; m < length; m++) {
                const current = selected[m]
                if (!current || !current.active)
                    continue

                metadata[6] = current.pickID[0]
                metadata[7] = current.pickID[1]
                metadata[8] = current.pickID[2]

                const sprite = current.spriteComponent
                const mesh = current.meshRef
                metadata[0] = sprite && !mesh ? 1 : 0

                context.uniformMatrix4fv(uniforms.transformMatrix, false, current.matrix)

                if (mesh) {
                    context.uniformMatrix3fv(uniforms.metadata, false, metadata)
                    mesh.draw()
                } else if (sprite) {
                    metadata[1] = sprite.attributes[0]
                    metadata[2] = sprite.attributes[1]
                    metadata[3] = current.scaling[0]
                    metadata[4] = current.scaling[1]
                    metadata[5] = current.scaling[2]
                    context.uniformMatrix3fv(uniforms.metadata, false, metadata)
                    StaticMeshRepository.drawQuad()
                }
            }
            FramebufferRepository.postProcessing1.stopMapping()
        } else
            FramebufferRepository.postProcessing1.clear()
    }

    static drawSilhouette() {
        const context = GPU.context

        ShaderRepository.outline.bind()
        const outlineShaderUniforms = ShaderRepository.outlineUniforms
        context.uniform2fv(outlineShaderUniforms.bufferSize, GPU.bufferResolution)
        context.uniform1f(outlineShaderUniforms.outlineWidth, EngineToolsState.outlineWidth)
        if (EngineToolsState.showOutline) {
            GPU.bind2DTextureForDrawing(outlineShaderUniforms.silhouette, 0, FramebufferRepository.entityIDSampler)

            context.uniform1i(outlineShaderUniforms.isOutline, 1)
            context.uniform3fv(outlineShaderUniforms.outlineColor, EngineToolsState.outlineColor || fallbackColor)
            context.uniform2fv(outlineShaderUniforms.mouseCoordinates, EngineToolsState.mouseCoordinates)
            StaticMeshRepository.drawQuad()
        }

        const length = EngineTools.selected.length
        if (length > 0) {
            context.activeTexture(context.TEXTURE0)
            context.bindTexture(context.TEXTURE_2D, FramebufferRepository.postProcessing1Sampler)
            context.uniform1i(outlineShaderUniforms.silhouette, 0)
            context.uniform1i(outlineShaderUniforms.isOutline, 0)
            StaticMeshRepository.drawQuad()
        }
    }
}
