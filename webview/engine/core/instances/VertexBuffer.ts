import GPUAPI from "../services/GPUAPI"
import GPUService from "../services/GPUService"

export default class VertexBuffer {
	private readonly id: WebGLBuffer
	private readonly stride: number
	private readonly index: number
	private readonly type: number
	private readonly size: number
	private readonly normalized: boolean
	length = 0

	constructor(index: number, data, type: number, size: number, dataType: number, normalized?: boolean, renderingType?: number, stride?: number) {
		this.id = GPUAPI.createBuffer(type, data, renderingType)

		GPUService.context.vertexAttribPointer(
			index,
			size,
			dataType,
			normalized,
			stride||0,
			0)
		GPUService.context.bindBuffer(type, null)

		this.stride = stride || 0
		this.index = index
		this.type = type
		this.size = size
		this.normalized = normalized

		this.length = data.length
	}

	enable() {
		GPUService.context.enableVertexAttribArray(this.index)
		GPUService.context.bindBuffer(this.type, this.id)
		GPUService.context.vertexAttribPointer(this.index, this.size, this.type, this.normalized, this.stride, 0)
	}

	disable() {
		GPUService.context.disableVertexAttribArray(this.index)
		GPUService.context.bindBuffer(this.type, null)
	}

	delete() {
		GPUService.context.deleteBuffer(this.id)
	}
}