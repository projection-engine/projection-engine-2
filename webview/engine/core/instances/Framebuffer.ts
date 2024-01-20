import GPUService from "../services/GPUService"
import Texture from "./Texture"

interface FBOTexture {
    [key: string]: any,

    w?: number,
    h?: number,
    attachment?: number,
    precision?: number,
    format?: number,
    type?: number,
    linear?: boolean,
    repeat?: boolean

}

export default class Framebuffer {
	private readonly fallback: FBOTexture

	readonly width: number
	readonly height: number
	readonly FBO: WebGLFramebuffer
	RBO: WebGLRenderbuffer
	depthSampler: WebGLTexture
	readonly colors: WebGLTexture[] = []
	readonly attachments: number[] = []
	readonly colorsMetadata: FBOTexture[] = []
	resolution = new Float32Array(2)

	constructor(width = GPUService.internalResolution.w, height = GPUService.internalResolution.h) {

		this.width = width
		this.height = height
		this.resolution[0] = width
		this.resolution[1] = height
		this.FBO = GPUService.context.createFramebuffer()

		this.fallback = {
			w: this.width,
			h: this.height,
			attachment: 0,
			precision: GPUService.context.RGBA16F,
			format: GPUService.context.RGBA,
			type: GPUService.context.FLOAT,
			linear: false,
			repeat: false
		}
	}


	startMapping(noClearing?: boolean) {
		if (GPUService.activeFramebuffer === this)
			return
		this.use()
		GPUService.context.viewport(0, 0, this.width, this.height)
		if (!noClearing)
			GPUService.context.clear(GPUService.context.COLOR_BUFFER_BIT | GPUService.context.DEPTH_BUFFER_BIT)
	}


	stopMapping() {
		if (GPUService.activeFramebuffer !== this)
			return

		const context = GPUService.context
		GPUService.activeFramebuffer = undefined
		context.bindFramebuffer(context.FRAMEBUFFER, null)
	}

	depthTexture(): Framebuffer {
		this.use()
		this.depthSampler = Texture.createTexture(
			this.width,
			this.height,
			GPUService.context.DEPTH_COMPONENT24,
			0,
			GPUService.context.DEPTH_COMPONENT,
			GPUService.context.UNSIGNED_INT,
			null,
			GPUService.context.NEAREST,
			GPUService.context.NEAREST,
			GPUService.context.CLAMP_TO_EDGE,
			GPUService.context.CLAMP_TO_EDGE,
			true
		)

		GPUService.context.framebufferTexture2D(
			GPUService.context.FRAMEBUFFER,
			GPUService.context.DEPTH_ATTACHMENT,
			GPUService.context.TEXTURE_2D,
			this.depthSampler,
			0
		)
		return this
	}

	depthTest(): Framebuffer {
		this.use()
		this.RBO = GPUService.context.createRenderbuffer()
		GPUService.context.bindRenderbuffer(GPUService.context.RENDERBUFFER, this.RBO)
		GPUService.context.renderbufferStorage(GPUService.context.RENDERBUFFER, GPUService.context.DEPTH_COMPONENT24, this.width, this.height)
		GPUService.context.framebufferRenderbuffer(GPUService.context.FRAMEBUFFER, GPUService.context.DEPTH_ATTACHMENT, GPUService.context.RENDERBUFFER, this.RBO)

		return this
	}

	texture(obj?: FBOTexture): Framebuffer {
		const w = obj?.w || this.fallback.w
		const h = obj?.h || this.fallback.h
		const attachment = obj?.attachment || this.fallback.attachment
		const precision = obj?.precision || this.fallback.precision
		const format = obj?.format || this.fallback.format
		const type = obj?.type || this.fallback.type
		const linear = obj?.linear || this.fallback.linear
		const repeat = obj?.repeat || this.fallback.repeat


		this.colorsMetadata.push({...this.fallback, ...obj})
		this.use()
		const texture = GPUService.context.createTexture()
		GPUService.context.bindTexture(GPUService.context.TEXTURE_2D, texture)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MAG_FILTER, linear ? GPUService.context.LINEAR : GPUService.context.NEAREST)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MIN_FILTER, linear ? GPUService.context.LINEAR : GPUService.context.NEAREST)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_S, repeat ? GPUService.context.REPEAT : GPUService.context.CLAMP_TO_EDGE)
		GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_T, repeat ? GPUService.context.REPEAT : GPUService.context.CLAMP_TO_EDGE)

		GPUService.context.texImage2D(
			GPUService.context.TEXTURE_2D,
			0,
			precision,
			w,
			h,
			0,
			format,
			type,
			null)
		GPUService.context.framebufferTexture2D(GPUService.context.FRAMEBUFFER, GPUService.context.COLOR_ATTACHMENT0 + attachment, GPUService.context.TEXTURE_2D, texture, 0)

		this.colors.push(texture)
		this.attachments[attachment] = GPUService.context.COLOR_ATTACHMENT0 + attachment
		GPUService.context.drawBuffers(this.attachments)

		return this
	}

	use() {
		if (GPUService.activeFramebuffer === this)
			return
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, this.FBO)
		GPUService.activeFramebuffer = this
	}

	clear() {
		this.use()
		GPUService.context.clear(GPUService.context.COLOR_BUFFER_BIT | GPUService.context.DEPTH_BUFFER_BIT)
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)
	}

	stop() {
		GPUService.activeFramebuffer = undefined
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)
	}

	static toImage(fbo, w = 300, h = 300): string {
		const canvas = document.createElement("canvas")
		canvas.width = w
		canvas.height = h
		const context = canvas.getContext("2d")
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, fbo)
		const data = new Float32Array(w * h * 4)
		GPUService.context.readPixels(0, 0, w, h, GPUService.context.RGBA, GPUService.context.FLOAT, data)
		for (let i = 0; i < data.length; i += 4) {
			data[i] *= 255
			data[i + 1] *= 255
			data[i + 2] *= 255
			data[i + 3] = 255
		}

		const imageData = context.createImageData(w, h)
		imageData.data.set(data)
		context.putImageData(imageData, 0, 0)
		GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)
		return canvas.toDataURL()
	}
}