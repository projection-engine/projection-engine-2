import QUAD_VERT from "../../shaders/QUAD.vert"
import BRDF_FRAG from "../../shaders/BRDF_GEN.frag"
import Shader from "../instances/Shader"
import Framebuffer from "../instances/Framebuffer"
import Material from "../instances/Material"
import Mesh from "../instances/Mesh"
import Texture from "../instances/Texture"
import LightProbe from "../instances/LightProbe"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import DynamicMap from "../lib/DynamicMap"
import ConversionAPI from "@engine-core/services/ConversionAPI";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import generateSsaoNoise from "@engine-core/utils/generate-ssao-noise";
import UBORepository from "@engine-core/repositories/UBORepository";
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository";

export default class GPU extends AbstractEngineCoreService {
    static context?: WebGL2RenderingContext
    static canvas?: HTMLCanvasElement
    static activeShader?: Shader
    static activeFramebuffer?: Framebuffer
    static activeMesh?: Mesh
    static materials = new DynamicMap<Material>()
    static shaders = new DynamicMap<Shader>()
    static frameBuffers = new DynamicMap<Framebuffer>()
    static meshes = new DynamicMap<Mesh>()
    static textures = new DynamicMap<Texture>()
    static BRDF: WebGLTexture
    static internalResolution = {w: 0, h: 0}
    static skylightProbe: LightProbe
    static bufferResolution = new Float32Array([0, 0])

    initialize() {
        this.initializeWebGLContext(this.engine.getMainResolution(), this.engine.getCanvas());
        GPU.skylightProbe = new LightProbe(128)
        this.addResizeObserver()
    }

    private addResizeObserver() {
        ConversionAPI.canvasBBox = GPU.canvas.getBoundingClientRect()
        const OBS = new ResizeObserver(() => {
            const bBox = GPU.canvas.getBoundingClientRect()
            ConversionAPI.canvasBBox = bBox
            const camera = this.engine.getCamera();
            if (camera != null) {
                camera.aspectRatio = bBox.width / bBox.height
                camera.updateProjection()
                camera.updateAspectRatio()
            }
        })
        OBS.observe(GPU.canvas.parentElement)
        OBS.observe(GPU.canvas)
    }

    async generateBRDF() {
        const FBO = new Framebuffer(512, 512).texture({
            precision: GPU.context.RG32F,
            format: GPU.context.RG
        })
        const brdfShader = await this.getShaderInstance("QUAD.vert", "BRDF_GEN.frag")

        FBO.startMapping()
        brdfShader.bind()
        StaticMeshRepository.drawQuad()
        FBO.stopMapping()
        GPU.BRDF = FBO.colors[0]
        GPU.context.deleteProgram(brdfShader.program)
    }

    private initializeWebGLContext(mainResolution: { w: number; h: number }, canvas: HTMLCanvasElement) {
        const screen = window.screen
        GPU.internalResolution.w = mainResolution?.w || screen.width
        GPU.internalResolution.h = mainResolution?.h || screen.height
        GPU.bufferResolution[0] = GPU.internalResolution.w
        GPU.bufferResolution[1] = GPU.internalResolution.h
        GPU.context = canvas.getContext("webgl2", {
            antialias: false,
            // preserveDrawingBuffer: false,
            premultipliedAlpha: false,
            powerPreference: "high-performance"
        })
        GPU.canvas = canvas
        GPU.context.getExtension("EXT_color_buffer_float")
        GPU.context.getExtension("OES_texture_float")
        GPU.context.getExtension("OES_texture_float_linear")

        GPU.context.enable(GPU.context.BLEND)
        GPU.context.blendFunc(GPU.context.SRC_ALPHA, GPU.context.ONE_MINUS_SRC_ALPHA)
        GPU.context.enable(GPU.context.CULL_FACE)
        GPU.context.cullFace(GPU.context.BACK)
        GPU.context.enable(GPU.context.DEPTH_TEST)
        GPU.context.depthFunc(GPU.context.LESS)
        GPU.context.frontFace(GPU.context.CCW)
    }

    static bind2DTextureForDrawing(uniform: WebGLUniformLocation, activeIndex: number, sampler: WebGLTexture) {
        const context = GPU.context
        context.activeTexture(context.TEXTURE0 + activeIndex)
        context.bindTexture(context.TEXTURE_2D, sampler)
        context.uniform1i(uniform, activeIndex)
    }

    async getShaderInstance(vertexName: string, fragName: string): Promise<Shader> {
        const result = await this.engine.getResourceLoader().requestShader(vertexName, fragName);
        const shader = new Shader(result.vertex, result.fragment);
        if (shader.messages.hasError) {
            console.trace(result, vertexName, fragName)
        }
        return shader
    }

    static generateSSAONoise(resolution: number) {
        const context = GPU.context
        const {kernels, noise} = generateSsaoNoise(resolution, resolution)

        UBORepository.ssaoUBO.bind()
        UBORepository.ssaoUBO.updateData("samples", kernels)
        UBORepository.ssaoUBO.unbind()
        FramebufferRepository.noiseSampler = context.createTexture()

        context.bindTexture(context.TEXTURE_2D, FramebufferRepository.noiseSampler)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.REPEAT)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.REPEAT)
        context.texStorage2D(context.TEXTURE_2D, 1, context.RG16F, resolution, resolution)
        context.texSubImage2D(context.TEXTURE_2D, 0, 0, 0, resolution, resolution, context.RG, context.FLOAT, noise)
    }
}

RepositoryService.serializable(GPU)
