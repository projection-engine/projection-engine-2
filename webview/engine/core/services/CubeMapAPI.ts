import GPUService from "./GPUService"
import LightProbe from "../instances/LightProbe"
import AbstractEngineService from "@engine-core/AbstractEngineService";


export default class CubeMapAPI extends AbstractEngineService{
	static frameBuffer?:WebGLFramebuffer

	static #initialized = false
	async initialize() {
		if (CubeMapAPI.#initialized)
			return
		CubeMapAPI.#initialized = true
		GPUService.context.bindVertexArray(null)
		CubeMapAPI.frameBuffer = GPUService.context.createFramebuffer()
	}

	static createRenderBuffer(resolution:number):WebGLRenderbuffer {
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, CubeMapAPI.frameBuffer)
		const rbo = GPUService.context.createRenderbuffer()
		GPUService.context.bindRenderbuffer(GPUService.context.RENDERBUFFER, rbo)
		GPUService.context.renderbufferStorage(GPUService.context.RENDERBUFFER, GPUService.context.DEPTH_COMPONENT24, resolution, resolution)
		GPUService.context.framebufferRenderbuffer(GPUService.context.FRAMEBUFFER, GPUService.context.DEPTH_ATTACHMENT, GPUService.context.RENDERBUFFER, rbo)
		return rbo
	}

	static initializeTexture(asDepth:boolean, resolution:number, mipmap?:boolean):WebGLTexture {
		const texture = GPUService.context.createTexture()
		GPUService.context.bindTexture(GPUService.context.TEXTURE_CUBE_MAP, texture)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_CUBE_MAP, GPUService.context.TEXTURE_MAG_FILTER, asDepth ? GPUService.context.NEAREST : GPUService.context.LINEAR)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_CUBE_MAP, GPUService.context.TEXTURE_MIN_FILTER, asDepth ? GPUService.context.NEAREST : (mipmap ? GPUService.context.LINEAR_MIPMAP_LINEAR : GPUService.context.LINEAR))

		GPUService.context.texParameteri(GPUService.context.TEXTURE_CUBE_MAP, GPUService.context.TEXTURE_WRAP_S, GPUService.context.CLAMP_TO_EDGE)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_CUBE_MAP, GPUService.context.TEXTURE_WRAP_T, GPUService.context.CLAMP_TO_EDGE)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_CUBE_MAP, GPUService.context.TEXTURE_WRAP_R, GPUService.context.CLAMP_TO_EDGE)
		const d = [
			{access: GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_X},
			{access: GPUService.context.TEXTURE_CUBE_MAP_NEGATIVE_X},
			{access: GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_Y},
			{access: GPUService.context.TEXTURE_CUBE_MAP_NEGATIVE_Y},
			{access: GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_Z},
			{access: GPUService.context.TEXTURE_CUBE_MAP_NEGATIVE_Z}
		]
		for (let i = 0; i < 6; i++) {
			GPUService.context.texImage2D(
				d[i].access,
				0,
				asDepth ? GPUService.context.DEPTH_COMPONENT32F : GPUService.context.RGBA16F,
				resolution,
				resolution,
				0,
				asDepth ? GPUService.context.DEPTH_COMPONENT : GPUService.context.RGBA,
				GPUService.context.FLOAT,
				null)
		}

		if (mipmap)
			GPUService.context.generateMipmap(GPUService.context.TEXTURE_CUBE_MAP)
		return texture
	}

	static delete(probe:LightProbe) {
		if (probe.texture)
			GPUService.context.deleteTexture(probe.texture)
		if (probe.irradianceTexture)
			GPUService.context.deleteTexture(probe.irradianceTexture)
		if (probe.prefiltered)
			GPUService.context.deleteTexture(probe.prefiltered)
	}
}

