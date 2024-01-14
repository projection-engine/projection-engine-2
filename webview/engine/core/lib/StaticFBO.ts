import GPU from "../GPU"
import Framebuffer from "../instances/Framebuffer"
import IMAGE_WORKER_ACTIONS from "../static/IMAGE_WORKER_ACTIONS"
import StaticUBOs from "./StaticUBOs"
import EngineState from "../EngineState"
import generateSsaoNoise from "@engine-core/utils/generate-ssao-noise";
import IManageable from "@engine-core/IManageable";

const RESOLUTION = 4

export default class StaticFBO extends IManageable {
    static visibility?: Framebuffer
    static sceneDepthVelocity?: WebGLTexture
    static entityIDSampler?: WebGLTexture

    static lens?: Framebuffer
    static lensSampler?: WebGLTexture

    static postProcessing1?: Framebuffer
    static postProcessing1Sampler?: WebGLTexture

    static postProcessing2?: Framebuffer
    static postProcessing2Sampler?: WebGLTexture

    static ssgi?: Framebuffer
    static ssgiSampler?: WebGLTexture

    static ssgiFallback?: Framebuffer
    static ssgiFallbackSampler?: WebGLTexture

    static ssao?: Framebuffer
    static ssaoSampler?: WebGLTexture

    static ssaoBlurred?: Framebuffer
    static ssaoBlurredSampler?: WebGLTexture


    static downscaleBloom: Framebuffer[] = []
    static upscaleBloom: Framebuffer[] = []

    static shadows?: Framebuffer
    static shadowsSampler?: WebGLTexture

    static noiseSampler?: WebGLTexture
    static #initialized = false

    async initialize() {
        if (StaticFBO.#initialized)
            return
        StaticFBO.#initialized = true
        const context = GPU.context
        const halfResW = GPU.internalResolution.w / 2
        const halfResH = GPU.internalResolution.h / 2

        StaticFBO.visibility = (new Framebuffer())
            .texture({
                attachment: 0,
                precision: context.RGBA32F,
                format: context.RGBA,
                label: "DEPTH"
            })
            .texture({
                attachment: 1,
                label: "ENTITY_ID",
                precision: context.RGBA,
                format: context.RGBA,
                type: context.UNSIGNED_BYTE
            })
            .depthTest()


        StaticFBO.postProcessing1 = new Framebuffer().texture()
        StaticFBO.postProcessing2 = new Framebuffer().texture().depthTest()

        const linearTexture = {
            linear: true,
            precision: context.RGBA,
            format: context.RGBA,
            type: context.UNSIGNED_BYTE
        }

        StaticFBO.ssgi = new Framebuffer(halfResW, halfResH).texture(linearTexture)
        StaticFBO.ssgiFallback = new Framebuffer(halfResW, halfResH).texture(linearTexture)

        const SSAO_SETTINGS = {
            linear: true,
            precision: context.R8,
            format: context.RED,
            type: context.UNSIGNED_BYTE
        }
        StaticFBO.ssao = new Framebuffer(halfResW, halfResH).texture(SSAO_SETTINGS)
        StaticFBO.ssaoBlurred = new Framebuffer(halfResW, halfResH).texture(SSAO_SETTINGS)
        StaticFBO.lens = new Framebuffer().texture()


        const Q = 7
        let w = GPU.internalResolution.w, h = GPU.internalResolution.h
        for (let i = 0; i < Q; i++) {
            w /= 2
            h /= 2
            StaticFBO.downscaleBloom.push((new Framebuffer(w, h)).texture(linearTexture))
        }
        for (let i = 0; i < (Q / 2 - 1); i++) {
            w *= 4
            h *= 4
            StaticFBO.upscaleBloom.push((new Framebuffer(w, h)).texture(linearTexture))
        }

        StaticFBO.ssaoBlurredSampler = StaticFBO.ssaoBlurred.colors[0]
        StaticFBO.ssaoSampler = StaticFBO.ssao.colors[0]
        StaticFBO.ssgiSampler = StaticFBO.ssgi.colors[0]
        StaticFBO.ssgiFallbackSampler = StaticFBO.ssgiFallback.colors[0]
        StaticFBO.sceneDepthVelocity = StaticFBO.visibility.colors[0]
        StaticFBO.entityIDSampler = StaticFBO.visibility.colors[1]
        StaticFBO.postProcessing1Sampler = StaticFBO.postProcessing1.colors[0]
        StaticFBO.postProcessing2Sampler = StaticFBO.postProcessing2.colors[0]
        StaticFBO.lensSampler = StaticFBO.lens.colors[0]

        StaticFBO.updateDirectionalShadowsFBO()
    }

    static updateDirectionalShadowsFBO() {
        const context = GPU.context
        if (StaticFBO.shadows)
            context.deleteTexture(StaticFBO.shadows.depthSampler)
        StaticFBO.shadows = new Framebuffer(EngineState.shadowMapResolution, EngineState.shadowMapResolution).depthTexture()
        StaticFBO.shadowsSampler = StaticFBO.shadows.depthSampler
    }

    static async generateSSAONoise() {
        const context = GPU.context
        const {kernels, noise} = generateSsaoNoise(RESOLUTION, RESOLUTION)

        StaticUBOs.ssaoUBO.bind()
        StaticUBOs.ssaoUBO.updateData("samples", kernels)
        StaticUBOs.ssaoUBO.unbind()
        StaticFBO.noiseSampler = context.createTexture()

        context.bindTexture(context.TEXTURE_2D, StaticFBO.noiseSampler)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.REPEAT)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.REPEAT)
        context.texStorage2D(context.TEXTURE_2D, 1, context.RG16F, RESOLUTION, RESOLUTION)
        context.texSubImage2D(context.TEXTURE_2D, 0, 0, 0, RESOLUTION, RESOLUTION, context.RG, context.FLOAT, noise)

    }
}