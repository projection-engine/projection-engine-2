import GPU from "../../GPU"
import ResourceEntityMapper from "../../repositories/ResourceEntityMapper"
import StaticShaders from "../../repositories/StaticShaders"
import StaticMeshes from "../../repositories/StaticMeshes"
import MetricsController from "../../services/MetricsController"
import METRICS_FLAGS from "../../static/METRICS_FLAGS"
import AtmosphereComponent from "../../instances/components/AtmosphereComponent"
import {mat4} from "gl-matrix"
import ProjectionEngine from "@lib/ProjectionEngine";

const resources = mat4.create().fill(0)
export default class AtmosphereRenderer {
	static execute() {
		const shader = StaticShaders.atmosphere
		const uniforms = StaticShaders.atmosphereUniforms
		const context = GPU.context
		const entities = ResourceEntityMapper.atmosphere.array
		const size = entities.length
		if (size === 0)
			return
		for (let i = 0; i < size; i++) {
			if (i === 0) {
				shader.bind()
				context.disable(context.DEPTH_TEST)
				context.uniformMatrix4fv(uniforms.invSkyProjectionMatrix, false, ProjectionEngine.Engine.getCamera().invSkyboxProjectionMatrix)
			}
			const entity = entities[i]
			const component = entity.atmosphereComponent
			if (!entity.active)
				continue
			AtmosphereComponent.bindResources(resources, component)
			context.uniform1i(uniforms.type, component.renderingType)
			context.uniformMatrix4fv(uniforms.information, false, resources)

			StaticMeshes.drawQuad()
		}
		context.enable(context.DEPTH_TEST)

		MetricsController.currentState = METRICS_FLAGS.ATMOSPHERE
	}
}