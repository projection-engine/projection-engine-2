import GPU from "@engine-core/core/GPU"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository"
import StaticMeshRepository from "@engine-core/repositories/StaticMeshRepository"
import EngineToolsState from "../EngineToolsState"
import ShaderRepository from "@engine-core/repositories/ShaderRepository";

export default class GridSystem {
	static #buffer = new Float32Array([.3, 20, 50, 1])

	static execute() {
		const context = GPU.context
		if(!EngineToolsState.showGrid)
			return

		ShaderRepository.grid.bind()
		const uniforms = ShaderRepository.gridUniforms
		const buffer = GridSystem.#buffer
		buffer[0] = EngineToolsState.gridColor
		buffer[1] = EngineToolsState.gridScale
		buffer[2] = EngineToolsState.gridThreshold
		buffer[3] = EngineToolsState.gridOpacity


		context.uniform4fv(uniforms.settings, buffer)

		GPU.bind2DTextureForDrawing(uniforms.sceneDepth, 0,FramebufferRepository.sceneDepthVelocity)


		context.uniform2fv(uniforms.resolution, GPU.bufferResolution)

		StaticMeshRepository.plane.draw()
	}
}
