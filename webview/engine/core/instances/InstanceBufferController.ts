import Entity from "./Entity"
import GPUService from "../services/GPUService"

export default class InstanceBufferController {
	id?:string
	bufferSize = 0
	entities = new Map<string,Entity>()
	transformVBO?:WebGLBuffer

	constructor(materialID) {
		this.id = materialID
		this.transformVBO = GPUService.context.createBuffer()
	}

	updateBuffer() {
		this.bufferSize = this.entities.size
		if (this.bufferSize > 0) {
			const data = []
			this.entities.forEach(entity => data.push(Array.from(entity.matrix)))
			const temp = new Float32Array(data.flat())
			GPUService.context.bindBuffer(GPUService.context.ARRAY_BUFFER, this.transformVBO)
			GPUService.context.bufferData(GPUService.context.ARRAY_BUFFER, temp, GPUService.context.STREAM_DRAW)
		}
	}

	bind() {
		GPUService.context.bindBuffer(GPUService.context.ARRAY_BUFFER, this.transformVBO)
		GPUService.context.enableVertexAttribArray(1)
		GPUService.context.enableVertexAttribArray(2)
		GPUService.context.enableVertexAttribArray(3)
		GPUService.context.enableVertexAttribArray(4)

		GPUService.context.vertexAttribPointer(1, 4, GPUService.context.FLOAT, false, 64, 0)
		GPUService.context.vertexAttribPointer(2, 4, GPUService.context.FLOAT, false, 64, 16)
		GPUService.context.vertexAttribPointer(3, 4, GPUService.context.FLOAT, false, 64, 32)
		GPUService.context.vertexAttribPointer(4, 4, GPUService.context.FLOAT, false, 64, 48)
		GPUService.context.vertexAttribDivisor(1, 1)
		GPUService.context.vertexAttribDivisor(2, 1)
		GPUService.context.vertexAttribDivisor(3, 1)
		GPUService.context.vertexAttribDivisor(4, 1)
	}
}