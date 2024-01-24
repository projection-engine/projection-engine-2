import GPU from "../core/GPU"
import Framebuffer from "../instances/Framebuffer"
import UBORepository from "./UBORepository"
import EngineState from "../EngineState"
import generateSsaoNoise from "@engine-core/utils/generate-ssao-noise";
import AbstractEngineService from "@engine-core/AbstractEngineService";

const RESOLUTION = 4

export default class FramebufferRepository extends AbstractEngineService {
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
        if (FramebufferRepository.#initialized)
            return
        FramebufferRepository.#initialized = true
        const context = GPU.context
        const halfResW = GPU.internalResolution.w / 2
        const halfResH = GPU.internalResolution.h / 2

        FramebufferRepository.visibility = (new Framebuffer())
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


        FramebufferRepository.postProcessing1 = new Framebuffer().texture()
        FramebufferRepository.postProcessing2 = new Framebuffer().texture().depthTest()

        const linearTexture = {
            linear: true,
            precision: context.RGBA,
            format: context.RGBA,
            type: context.UNSIGNED_BYTE
        }

        FramebufferRepository.ssgi = new Framebuffer(halfResW, halfResH).texture(linearTexture)
        FramebufferRepository.ssgiFallback = new Framebuffer(halfResW, halfResH).texture(linearTexture)

        const SSAO_SETTINGS = {
            linear: true,
            precision: context.R8,
            format: context.RED,
            type: context.UNSIGNED_BYTE
        }
        FramebufferRepository.ssao = new Framebuffer(halfResW, halfResH).texture(SSAO_SETTINGS)
        FramebufferRepository.ssaoBlurred = new Framebuffer(halfResW, halfResH).texture(SSAO_SETTINGS)
        FramebufferRepository.lens = new Framebuffer().texture()


        const Q = 7
        let w = GPU.internalResolution.w, h = GPU.internalResolution.h
        for (let i = 0; i < Q; i++) {
            w /= 2
            h /= 2
            FramebufferRepository.downscaleBloom.push((new Framebuffer(w, h)).texture(linearTexture))
        }
        for (let i = 0; i < (Q / 2 - 1); i++) {
            w *= 4
            h *= 4
            FramebufferRepository.upscaleBloom.push((new Framebuffer(w, h)).texture(linearTexture))
        }

        FramebufferRepository.ssaoBlurredSampler = FramebufferRepository.ssaoBlurred.colors[0]
        FramebufferRepository.ssaoSampler = FramebufferRepository.ssao.colors[0]
        FramebufferRepository.ssgiSampler = FramebufferRepository.ssgi.colors[0]
        FramebufferRepository.ssgiFallbackSampler = FramebufferRepository.ssgiFallback.colors[0]
        FramebufferRepository.sceneDepthVelocity = FramebufferRepository.visibility.colors[0]
        FramebufferRepository.entityIDSampler = FramebufferRepository.visibility.colors[1]
        FramebufferRepository.postProcessing1Sampler = FramebufferRepository.postProcessing1.colors[0]
        FramebufferRepository.postProcessing2Sampler = FramebufferRepository.postProcessing2.colors[0]
        FramebufferRepository.lensSampler = FramebufferRepository.lens.colors[0]

        FramebufferRepository.updateDirectionalShadowsFBO()
    }

    static updateDirectionalShadowsFBO() {
        const context = GPU.context
        if (FramebufferRepository.shadows)
            context.deleteTexture(FramebufferRepository.shadows.depthSampler)
        FramebufferRepository.shadows = new Framebuffer(EngineState.shadowMapResolution, EngineState.shadowMapResolution).depthTexture()
        FramebufferRepository.shadowsSampler = FramebufferRepository.shadows.depthSampler
    }

    static async generateSSAONoise() {
        const context = GPU.context
        const {kernels, noise} = generateSsaoNoise(RESOLUTION, RESOLUTION)

        UBORepository.ssaoUBO.bind()
        UBORepository.ssaoUBO.updateData("samples", kernels)
        UBORepository.ssaoUBO.unbind()
        FramebufferRepository.noiseSampler = context.createTexture()

        context.bindTexture(context.TEXTURE_2D, FramebufferRepository.noiseSampler)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.REPEAT)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.REPEAT)
        context.texStorage2D(context.TEXTURE_2D, 1, context.RG16F, RESOLUTION, RESOLUTION)
        context.texSubImage2D(context.TEXTURE_2D, 0, 0, 0, RESOLUTION, RESOLUTION, context.RG, context.FLOAT, noise)

    }
}