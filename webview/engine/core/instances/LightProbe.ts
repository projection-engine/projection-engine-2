import {mat4} from "gl-matrix"
import Mesh from "./Mesh"
import GPUService from "../services/GPUService"
import CubeMapAPI from "../services/CubeMapAPI"
import getProbeRotation from "../utils/get-probe-rotation"
import getProbeLookat from "../utils/get-probe-lookat"
import StaticMeshes from "../repositories/StaticMeshes"
import StaticShaders from "../repositories/StaticShaders"


const perspective = mat4.create()
export default class LightProbe {
	texture?: WebGLTexture
	prefiltered?: WebGLTexture
	irradianceTexture?: WebGLTexture
	#resolution?: number

	constructor(resolution: number) {
		this.resolution = resolution
	}

	set resolution(data: number) {
		if (data === this.#resolution || typeof data !== "number")
			return
		this.#resolution = data
		if (this.texture instanceof WebGLTexture)
			GPUService.context.deleteTexture(this.texture)

		// TODO - THIS CAUSES UNDEFINED BECAUSE CUBEMAPAPI HASNT YET BEEN INITIALIZED (ESBUILD)
		// this.texture = CubeMapAPI.initializeTexture(false, data, false)
	}

	get resolution(): number {
		return this.#resolution
	}

	drawDiffuseMap(sampler = this.texture, multiplier = [1, 1, 1]) {
		this.draw(
			(yaw, pitch, perspective) => {
				StaticShaders.irradiance.bindForUse({
					projectionMatrix: perspective,
					viewMatrix: getProbeLookat(yaw, pitch, [0, 0, 0]),
					uSampler: sampler,
					multiplier
				})
				GPUService.context.drawArrays(GPUService.context.TRIANGLES, 0, 36)
			},
			undefined,
			undefined,
			true
		)
	}

	drawSpecularMap(mipLevels = 6, resolution = 128) {
		mat4.perspective(perspective, 1.57, 1, .1, 10)
		Mesh.finishIfUsed()
		GPUService.context.viewport(0, 0, resolution, resolution)
		if (!this.prefiltered)
			this.prefiltered = CubeMapAPI.initializeTexture(false, resolution, true)


		const rbo = CubeMapAPI.createRenderBuffer(resolution)
		StaticMeshes.cubeBuffer.enable()

		for (let i = 0; i < mipLevels; i++) {
			const currentRes = resolution * Math.pow(0.5, i)
			const roughness = i / (mipLevels - 1)
			GPUService.context.viewport(0, 0, currentRes, currentRes)
			for (let j = 0; j < 6; j++) {
				GPUService.context.renderbufferStorage(GPUService.context.RENDERBUFFER, GPUService.context.DEPTH_COMPONENT24, currentRes, currentRes)
				const rotations = getProbeRotation(j)
				GPUService.context.framebufferTexture2D(
					GPUService.context.FRAMEBUFFER,
					GPUService.context.COLOR_ATTACHMENT0,
					GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_X + j,
					this.prefiltered,
					i
				)
				const shader = StaticShaders.prefiltered
				const uniforms = shader.uniformMap
				shader.bind()
				GPUService.context.uniformMatrix4fv(uniforms.projectionMatrix, false, perspective)
				GPUService.context.uniformMatrix4fv(uniforms.viewMatrix, false, getProbeLookat(rotations.yaw, rotations.pitch, [0, 0, 0]))
				GPUService.context.uniform1f(uniforms.roughness, roughness)

				GPUService.context.activeTexture(GPUService.context.TEXTURE0)
				GPUService.context.bindTexture(GPUService.context.TEXTURE_CUBE_MAP, this.texture)
				GPUService.context.uniform1i(uniforms.environmentMap, 0)

				GPUService.context.drawArrays(GPUService.context.TRIANGLES, 0, 36)
			}
		}
		StaticMeshes.cubeBuffer.disable()

		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)
		GPUService.context.deleteRenderbuffer(rbo)
	}

	draw(callback: Function, zFar?: number, zNear?: number, asIrradiance?: boolean): LightProbe {
		let resolution = asIrradiance ? 32 : this.#resolution, texture
		mat4.perspective(perspective, Math.PI / 2, 1, zNear || 1, zFar || 25)


		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, CubeMapAPI.frameBuffer)
		GPUService.context.viewport(0, 0, resolution, resolution)

		const rbo = CubeMapAPI.createRenderBuffer(resolution)

		if (!asIrradiance)
			texture = this.texture
		else {
			if (!this.irradianceTexture)
				this.irradianceTexture = CubeMapAPI.initializeTexture(false, resolution)
			texture = this.irradianceTexture
		}

		if (asIrradiance) {
			Mesh.finishIfUsed()
			StaticMeshes.cubeBuffer.enable()
		}

		for (let i = 0; i < 6; i++) {
			const rotations = getProbeRotation(i)
			GPUService.context.framebufferTexture2D(
				GPUService.context.FRAMEBUFFER,
				GPUService.context.COLOR_ATTACHMENT0,
				GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_X + i,
				texture,
				0
			)
			GPUService.context.clear(GPUService.context.COLOR_BUFFER_BIT | GPUService.context.DEPTH_BUFFER_BIT)

			callback(rotations.yaw, rotations.pitch, perspective, i)
		}
		if (asIrradiance)
			StaticMeshes.cubeBuffer.disable()

		GPUService.context.deleteRenderbuffer(rbo)
		return this
	}

}
