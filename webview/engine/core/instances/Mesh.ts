import VertexBuffer from "./VertexBuffer"

import GPUService from "../services/GPUService"
import GPUAPI from "../services/GPUAPI"
import ProjectionEngine from "@lib/ProjectionEngine";

export interface MeshProps {
    id?: string,
    vertices?: number[] | Float32Array,
    indices?: number[] | Float32Array,
    normals?: number[] | Float32Array,
    uvs?: number[] | Float32Array,
    tangents?: number[] | Float32Array,
    maxBoundingBox?: number[],
    minBoundingBox?: number[]

}

export default class Mesh {
	readonly verticesQuantity:number
	readonly trianglesQuantity:number
	readonly id: string
	readonly maxBoundingBox: number[]
	readonly minBoundingBox: number[]
	readonly VAO: WebGLVertexArrayObject
	readonly indexVBO?:WebGLBuffer
	readonly vertexVBO?:VertexBuffer
	readonly normalVBO?:VertexBuffer
	readonly uvVBO?:VertexBuffer
	#lastUsedElapsed = 0
	get lastUsedElapsed(){
		return this.#lastUsedElapsed
	}

	constructor(attributes:MeshProps) {
		const {
			id = crypto.randomUUID(),
			vertices,
			indices,
			normals,
			uvs,
			maxBoundingBox,
			minBoundingBox
		} = attributes

		this.id = id
		this.maxBoundingBox = maxBoundingBox
		this.minBoundingBox = minBoundingBox
		const l = indices.length
		this.trianglesQuantity = l / 3
		this.verticesQuantity = l

		this.VAO = GPUService.context.createVertexArray()
		GPUService.context.bindVertexArray(this.VAO)

		this.indexVBO = GPUAPI.createBuffer(GPUService.context.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices))
		this.vertexVBO = new VertexBuffer(0, new Float32Array(vertices), GPUService.context.ARRAY_BUFFER, 3, GPUService.context.FLOAT, false, undefined, 0)

		if (uvs && uvs.length > 0)
			this.uvVBO = new VertexBuffer(1, new Float32Array(uvs), GPUService.context.ARRAY_BUFFER, 2, GPUService.context.FLOAT, false, undefined, 0)

		if (normals && normals.length > 0)
			this.normalVBO = new VertexBuffer(2, new Float32Array(normals), GPUService.context.ARRAY_BUFFER, 3, GPUService.context.FLOAT, false, undefined, 0)

		GPUService.context.bindVertexArray(null)
		GPUService.context.bindBuffer(GPUService.context.ELEMENT_ARRAY_BUFFER, null)

	}

	static finishIfUsed() {
		const lastUsed = GPUService.activeMesh
		if (lastUsed != null)
			lastUsed.finish()
	}

	bindEssentialResources() {
		const last = GPUService.activeMesh
		if (last === this)
			return
		// else if (last != null)
		//     last.finish()

		GPUService.activeMesh = this
		GPUService.context.bindVertexArray(this.VAO)
		GPUService.context.bindBuffer(GPUService.context.ELEMENT_ARRAY_BUFFER, this.indexVBO)
		this.vertexVBO.enable()

	}

	bindAllResources() {
		const last = GPUService.activeMesh
		if (last === this)
			return
		GPUService.activeMesh = this
		GPUService.context.bindVertexArray(this.VAO)
		GPUService.context.bindBuffer(GPUService.context.ELEMENT_ARRAY_BUFFER, this.indexVBO)
		this.vertexVBO.enable()
		if (this.normalVBO)
			this.normalVBO.enable()
		if (this.uvVBO)
			this.uvVBO.enable()
	}

	finish() {
		GPUService.context.bindBuffer(GPUService.context.ELEMENT_ARRAY_BUFFER, null)
		this.vertexVBO.disable()

		if (this.uvVBO)
			this.uvVBO.disable()
		if (this.normalVBO)
			this.normalVBO.disable()

		GPUService.context.bindVertexArray(null)
		GPUService.activeMesh = undefined
	}

	simplifiedDraw() {

		this.bindEssentialResources()
		GPUService.context.drawElements(GPUService.context.TRIANGLES, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();
	}

	private updateLastUsed() {
		this.#lastUsedElapsed = ProjectionEngine.Engine.elapsed
	}

	draw() {
		this.bindAllResources()
		GPUService.context.drawElements(GPUService.context.TRIANGLES, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();

	}

	drawInstanced(quantity) {
		this.bindAllResources()
		GPUService.context.drawElementsInstanced(GPUService.context.TRIANGLES, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0, quantity)
		this.updateLastUsed();

	}

	drawLineLoop() {
		this.bindEssentialResources()
		GPUService.context.drawElements(GPUService.context.LINE_LOOP, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();

	}

	drawTriangleStrip() {
		this.bindEssentialResources()
		GPUService.context.drawElements(GPUService.context.TRIANGLE_STRIP, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();

	}

	drawTriangleFan() {
		this.bindEssentialResources()
		GPUService.context.drawElements(GPUService.context.TRIANGLE_FAN, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();

	}

	drawLines() {
		this.bindEssentialResources()
		GPUService.context.drawElements(GPUService.context.LINES, this.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
		this.updateLastUsed();
	}

}