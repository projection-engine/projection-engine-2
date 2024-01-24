import GPU from "../core/GPU"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import Framebuffer from "../instances/Framebuffer"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import EngineState from "../EngineState"
import AbstractSystem from "@engine-core/AbstractEngineSystem";
import GPUAPI from "@engine-core/services/GPUAPI";

let cleared = false
export default class SSGISystem extends AbstractSystem{
    static uniformSettings = new Float32Array(3)

    execute(gl: WebGL2RenderingContext) {
        GPUAPI.copyTexture(FramebufferRepository.postProcessing1, FramebufferRepository.postProcessing2, GPU.context.COLOR_BUFFER_BIT)


        if (!EngineState.ssgiEnabled) {
            if (!cleared) {
                FramebufferRepository.ssgi.clear()
                cleared = true
            }
            return
        }
        cleared = false
        const uniforms = ShaderRepository.ssgiUniforms
        FramebufferRepository.ssgi.startMapping()
        ShaderRepository.ssgi.bind()


        GPU.bind2DTextureForDrawing(uniforms.sceneDepth, 0, FramebufferRepository.sceneDepthVelocity)

        GPU.bind2DTextureForDrawing(uniforms.previousFrame, 1, FramebufferRepository.postProcessing2Sampler)

        gl.uniform3fv(uniforms.rayMarchSettings, SSGISystem.uniformSettings)

        StaticMeshRepository.drawQuad()
        this.#applyBlur(gl, FramebufferRepository.ssgiFallback, FramebufferRepository.ssgiSampler, true)
        this.#applyBlur(gl, FramebufferRepository.ssgi, FramebufferRepository.ssgiFallbackSampler, false)

        MetricsController.currentState = METRICS_FLAGS.SSGI
    }

     #applyBlur(gl: WebGL2RenderingContext, FBO: Framebuffer, color: WebGLTexture, first: boolean) {
        const uniforms = ShaderRepository.bilateralBlurUniforms

        if (first) {
            ShaderRepository.bilateralBlur.bind()

            gl.uniform1f(uniforms.blurRadius, EngineState.ssgiBlurRadius)
            gl.uniform1i(uniforms.samples, EngineState.ssgiBlurSamples)
            gl.uniform2fv(uniforms.bufferResolution, FramebufferRepository.ssgiFallback.resolution)

            GPU.bind2DTextureForDrawing(uniforms.entityIDSampler, 0, FramebufferRepository.entityIDSampler)
        } else
            gl.uniform1i(uniforms.samples, EngineState.ssgiBlurSamples / 2)
        FBO.startMapping()
         GPU.bind2DTextureForDrawing(uniforms.sceneColor, 1, color)

        StaticMeshRepository.drawQuad()
        FBO.stopMapping()
    }
}
