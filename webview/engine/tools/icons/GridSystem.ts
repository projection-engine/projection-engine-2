import GPUService from "@engine-core/services/GPUService"
import StaticFBO from "@engine-core/repositories/StaticFBO"
import StaticMeshes from "@engine-core/repositories/StaticMeshes"
import StaticEditorShaders from "../utils/StaticEditorShaders"
import EngineToolsState from "../EngineToolsState"
import GPUUtil from "../../core/utils/GPUUtil";

export default class GridSystem {
	static #buffer = new Float32Array([.3, 20, 50, 1])

	static execute() {
		const context = GPUService.context
		if(!EngineToolsState.showGrid)
			return

		StaticEditorShaders.grid.bind()
		const uniforms = StaticEditorShaders.gridUniforms
		const buffer = GridSystem.#buffer
		buffer[0] = EngineToolsState.gridColor
		buffer[1] = EngineToolsState.gridScale
		buffer[2] = EngineToolsState.gridThreshold
		buffer[3] = EngineToolsState.gridOpacity


		context.uniform4fv(uniforms.settings, buffer)

		GPUUtil.bind2DTextureForDrawing(uniforms.sceneDepth, 0,StaticFBO.sceneDepthVelocity)


		context.uniform2fv(uniforms.resolution, GPUService.bufferResolution)

		StaticMeshes.plane.draw()
	}
}
