import GPUService from "../services/GPUService"
import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import Framebuffer from "../instances/Framebuffer"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import EngineState from "../EngineState"
import GPUUtil from "../utils/GPUUtil";
import AbstractSystem from "@engine-core/AbstractEngineSystem";
import GPUAPI from "@engine-core/services/GPUAPI";

let cleared = false
export default class SSGISystem extends AbstractSystem{
    static uniformSettings = new Float32Array(3)

    execute(gl: WebGL2RenderingContext) {
        GPUAPI.copyTexture(StaticFBO.postProcessing1, StaticFBO.postProcessing2, GPUService.context.COLOR_BUFFER_BIT)


        if (!EngineState.ssgiEnabled) {
            if (!cleared) {
                StaticFBO.ssgi.clear()
                cleared = true
            }
            return
        }
        cleared = false
        const uniforms = StaticShaders.ssgiUniforms
        StaticFBO.ssgi.startMapping()
        StaticShaders.ssgi.bind()


        GPUUtil.bind2DTextureForDrawing(uniforms.sceneDepth, 0, StaticFBO.sceneDepthVelocity)

        GPUUtil.bind2DTextureForDrawing(uniforms.previousFrame, 1, StaticFBO.postProcessing2Sampler)

        gl.uniform3fv(uniforms.rayMarchSettings, SSGISystem.uniformSettings)

        StaticMeshes.drawQuad()
        this.#applyBlur(gl, StaticFBO.ssgiFallback, StaticFBO.ssgiSampler, true)
        this.#applyBlur(gl, StaticFBO.ssgi, StaticFBO.ssgiFallbackSampler, false)

        MetricsController.currentState = METRICS_FLAGS.SSGI
    }

     #applyBlur(gl: WebGL2RenderingContext, FBO: Framebuffer, color: WebGLTexture, first: boolean) {
        const uniforms = StaticShaders.bilateralBlurUniforms

        if (first) {
            StaticShaders.bilateralBlur.bind()

            gl.uniform1f(uniforms.blurRadius, EngineState.ssgiBlurRadius)
            gl.uniform1i(uniforms.samples, EngineState.ssgiBlurSamples)
            gl.uniform2fv(uniforms.bufferResolution, StaticFBO.ssgiFallback.resolution)

            GPUUtil.bind2DTextureForDrawing(uniforms.entityIDSampler, 0, StaticFBO.entityIDSampler)
        } else
            gl.uniform1i(uniforms.samples, EngineState.ssgiBlurSamples / 2)
        FBO.startMapping()
        GPUUtil.bind2DTextureForDrawing(uniforms.sceneColor, 1, color)

        StaticMeshes.drawQuad()
        FBO.stopMapping()
    }
}
