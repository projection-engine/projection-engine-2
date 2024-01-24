import GPU from "../core/GPU"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import UBORepository from "../repositories/UBORepository"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import EngineState from "../EngineState"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class SSAO extends AbstractEngineSystem {
    static noiseScale = new Float32Array(2)

    async initialize() {
        const RESOLUTION = 4
        SSAO.noiseScale[0] = GPU.internalResolution.w / RESOLUTION
        SSAO.noiseScale[1] = GPU.internalResolution.h / RESOLUTION

        UBORepository.ssaoUBO.bind()
        UBORepository.ssaoUBO.updateData("settings", new Float32Array([.5, .7, -.1, 1000]))
        UBORepository.ssaoUBO.updateData("noiseScale", SSAO.noiseScale)
        UBORepository.ssaoUBO.unbind()

        await FramebufferRepository.generateSSAONoise()
    }

    #draw(gl: WebGL2RenderingContext) {
        FramebufferRepository.ssao.startMapping()
        ShaderRepository.ssao.bind()


        GPU.bind2DTextureForDrawing(ShaderRepository.ssaoUniforms.sceneDepth, 0, FramebufferRepository.sceneDepthVelocity)

        GPU.bind2DTextureForDrawing(ShaderRepository.ssaoUniforms.noiseSampler, 1, FramebufferRepository.noiseSampler)

        gl.uniform1i(ShaderRepository.ssaoUniforms.maxSamples, EngineState.ssaoMaxSamples)

        StaticMeshRepository.drawQuad()
        FramebufferRepository.ssao.stopMapping()
    }

    #blur(gl: WebGL2RenderingContext) {
        ShaderRepository.boxBlur.bind()
        FramebufferRepository.ssaoBlurred.startMapping()

        GPU.bind2DTextureForDrawing(ShaderRepository.boxBlurUniforms.sampler, 0, FramebufferRepository.ssaoSampler)

        gl.uniform1i(ShaderRepository.boxBlurUniforms.samples, EngineState.ssaoBlurSamples)

        StaticMeshRepository.drawQuad()
        FramebufferRepository.ssaoBlurred.stopMapping()
    }

    execute(gl: WebGL2RenderingContext) {
        if (!EngineState.ssaoEnabled)
            return

        this.#draw(gl)
        this.#blur(gl)

        MetricsController.currentState = METRICS_FLAGS.SSAO
    }

}

