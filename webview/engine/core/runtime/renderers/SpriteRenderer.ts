import GPU from "../../core/GPU"
import ShaderRepository from "../../repositories/ShaderRepository"
import StaticMeshRepository from "../../repositories/StaticMeshRepository"
import MetricsController from "../../services/MetricsController"
import METRICS_FLAGS from "../../static/METRICS_FLAGS"
import Components from "@engine-core/static/Components";
import ProjectionEngine from "@lib/ProjectionEngine";

export default class SpriteRenderer{
	static execute() {
		const sprites = ProjectionEngine.Engine.getByComponent(Components.SPRITE)
		const size = sprites.length
		if (size === 0)
			return

		const context = GPU.context
		const textures = GPU.textures
		const uniforms = ShaderRepository.spriteUniforms
		ShaderRepository.sprite.bind()
		context.activeTexture(context.TEXTURE0)
		for (let i = 0; i < size; i++) {
			const current = sprites[i], component = current.spriteComponent
			if (!current.active || current.isCulled)
				continue
			const texture = textures.get(component.imageID)
			if (!texture)
				continue

			context.uniformMatrix4fv(uniforms.transformationMatrix, false, current.matrix)
			context.uniform3fv(uniforms.scale, current._scaling)
			context.uniform2fv(uniforms.attributes, component.attributes)

			GPU.bind2DTextureForDrawing(uniforms.iconSampler, 0,texture.texture)
			StaticMeshRepository.drawQuad()
		}

		MetricsController.currentState = METRICS_FLAGS.SPRITE
		context.enable(context.CULL_FACE)
	}
}
