import LineAPI from "@engine-core/services/LineAPI"
import GPUService from "@engine-core/services/GPUService"
import StaticFBO from "@engine-core/repositories/StaticFBO"
import StaticEditorShaders from "../utils/StaticEditorShaders"
import GPUUtil from "../../core/utils/GPUUtil";

const X = new Float32Array([1, 0, 0]), Y = new Float32Array([0, 1, 0]), Z = new Float32Array([0, 0, 1])

let darker = 0, atOrigin = 0, size = 10000
let finished = true, needsStateUpdate = false
let lineUniforms: { [key: string]: WebGLUniformLocation }

export default class LineRenderer {

	static setState(darkerState, atOriginState, sizeState) {
		darker = darkerState ? 1 : 0
		size = sizeState
		atOrigin = atOriginState ? 1 : 0
		needsStateUpdate = true
	}

	static initialize() {
		lineUniforms = StaticEditorShaders.lineUniforms
	}

	static finish() {
		finished = true
	}

	static #bind() {

		if (finished) {
			StaticEditorShaders.line.bind()

			GPUService.context.uniform1i(lineUniforms.darker, darker)
			GPUService.context.uniform1f(lineUniforms.size, size)
			GPUService.context.uniform1i(lineUniforms.atOrigin, atOrigin)

			GPUUtil.bind2DTextureForDrawing(lineUniforms.sceneDepth, 0, StaticFBO.sceneDepthVelocity)
			finished = false
		} else if (needsStateUpdate) {
			GPUService.context.uniform1i(lineUniforms.darker, darker)
			GPUService.context.uniform1f(lineUniforms.size, size)
			GPUService.context.uniform1i(lineUniforms.atOrigin, atOrigin)
			needsStateUpdate = false
		}
	}

	static drawX(matrix) {
		LineRenderer.#bind()
		GPUService.context.uniform3fv(lineUniforms.axis, X)
		GPUService.context.uniformMatrix4fv(lineUniforms.transformMatrix, false, matrix)
		LineAPI.drawX()
	}

	static drawY(matrix) {
		LineRenderer.#bind()
		GPUService.context.uniform3fv(lineUniforms.axis, Y)
		GPUService.context.uniformMatrix4fv(lineUniforms.transformMatrix, false, matrix)
		LineAPI.drawY()
	}

	static drawZ(matrix) {
		LineRenderer.#bind()
		GPUService.context.uniform3fv(lineUniforms.axis, Z)
		GPUService.context.uniformMatrix4fv(lineUniforms.transformMatrix, false, matrix)
		LineAPI.drawZ()
	}
}
