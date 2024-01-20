import QUAD_VERT from "../shaders/post-processing/QUAD.vert"
import BRDF_FRAG from "../shaders/post-processing/BRDF_GEN.frag"
import Shader from "../instances/Shader"
import Framebuffer from "../instances/Framebuffer"
import Material from "../instances/Material"
import Mesh from "../instances/Mesh"
import Texture from "../instances/Texture"
import LightProbe from "../instances/LightProbe"
import StaticMeshes from "../repositories/StaticMeshes"
import DynamicMap from "../lib/DynamicMap"
import AbstractEngineService from "@engine-core/AbstractEngineService";
import ConversionAPI from "@engine-core/services/ConversionAPI";

export default class GPUService extends AbstractEngineService{
	static context?: WebGL2RenderingContext
	static canvas?: HTMLCanvasElement
	static activeShader?: Shader
	static activeFramebuffer?: Framebuffer
	static activeMesh?: Mesh
	static materials = new DynamicMap<string, Material>()
	static shaders =  new DynamicMap<string, Shader>()
	static frameBuffers =  new DynamicMap<string, Framebuffer>()
	static meshes =  new DynamicMap<string, Mesh>()
	static textures =  new DynamicMap<string, Texture>()
	static BRDF: WebGLTexture
	static internalResolution = {w: 0, h: 0}
	static skylightProbe: LightProbe
	static bufferResolution = new Float32Array([0,0])

	async initialize() {
		if (GPUService.context != null)
			return
		this.initializeWebGLContext(this.engine.getMainResolution(), this.engine.getCanvas());
		GPUService.skylightProbe = new LightProbe(128)
		this.addResizeObserver()
	}

	private addResizeObserver() {
		ConversionAPI.canvasBBox = GPUService.canvas.getBoundingClientRect()
		const OBS = new ResizeObserver(() => {
			const bBox = GPUService.canvas.getBoundingClientRect()
			ConversionAPI.canvasBBox = bBox
			const camera = this.engine.getCamera();
			if(camera != null) {
				camera.aspectRatio = bBox.width / bBox.height
				camera.updateProjection()
				camera.updateAspectRatio()
			}
		})
		OBS.observe(GPUService.canvas.parentElement)
		OBS.observe(GPUService.canvas)
	}
	static generateBRDF() {
		const FBO = new Framebuffer(512, 512).texture({precision: GPUService.context.RG32F, format: GPUService.context.RG})
		const brdfShader = new Shader(QUAD_VERT, BRDF_FRAG)

		FBO.startMapping()
		brdfShader.bind()
		StaticMeshes.drawQuad()
		FBO.stopMapping()
		GPUService.BRDF = FBO.colors[0]
		GPUService.context.deleteProgram(brdfShader.program)
	}

	private initializeWebGLContext(mainResolution: { w: number; h: number }, canvas: HTMLCanvasElement) {
		const screen = window.screen
		GPUService.internalResolution.w = mainResolution?.w || screen.width
		GPUService.internalResolution.h = mainResolution?.h || screen.height
		GPUService.bufferResolution[0] = GPUService.internalResolution.w
		GPUService.bufferResolution[1] = GPUService.internalResolution.h
		GPUService.context = canvas.getContext("webgl2", {
			antialias: false,
			// preserveDrawingBuffer: false,
			premultipliedAlpha: false,
			powerPreference: "high-performance"
		})
		GPUService.canvas = canvas
		GPUService.context.getExtension("EXT_color_buffer_float")
		GPUService.context.getExtension("OES_texture_float")
		GPUService.context.getExtension("OES_texture_float_linear")

		GPUService.context.enable(GPUService.context.BLEND)
		GPUService.context.blendFunc(GPUService.context.SRC_ALPHA, GPUService.context.ONE_MINUS_SRC_ALPHA)
		GPUService.context.enable(GPUService.context.CULL_FACE)
		GPUService.context.cullFace(GPUService.context.BACK)
		GPUService.context.enable(GPUService.context.DEPTH_TEST)
		GPUService.context.depthFunc(GPUService.context.LESS)
		GPUService.context.frontFace(GPUService.context.CCW)
	}
}