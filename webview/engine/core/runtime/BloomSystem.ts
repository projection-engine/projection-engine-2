import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import StaticMeshes from "../repositories/StaticMeshes"
import Framebuffer from "../instances/Framebuffer"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";

export default class BloomSystem extends AbstractEngineSystem{
	 execute(gl: WebGL2RenderingContext) {

		if (!ProjectionEngine.Engine.getCamera().bloom)
			return
		StaticFBO.lens.startMapping()
		StaticShaders.bloom.bind()
		GPUUtil.bind2DTextureForDrawing(StaticShaders.bloomUniforms.sceneColor, 0, StaticFBO.postProcessing1Sampler)

		 gl.uniform1f(StaticShaders.bloomUniforms.threshold, ProjectionEngine.Engine.getCamera().bloomThreshold)
		StaticMeshes.drawQuad()
		StaticFBO.lens.stopMapping()

		StaticShaders.gaussian.bind()
		const downscale = StaticFBO.downscaleBloom
		const upscale = StaticFBO.upscaleBloom

		for (let i = 0; i < downscale.length; i++) {
			const fbo = downscale[i]
			fbo.startMapping()
			GPUUtil.bind2DTextureForDrawing(StaticShaders.gaussianUniforms.sceneColor, 0, i > 0 ? downscale[i - 1].colors[0] : StaticFBO.lensSampler)

			gl.uniform1f(StaticShaders.gaussianUniforms.blurRadius, 10)
			gl.uniform1i(StaticShaders.gaussianUniforms.samples, ProjectionEngine.Engine.getCamera().bloomQuality)
			gl.uniform2fv(StaticShaders.gaussianUniforms.bufferResolution, fbo.resolution)

			StaticMeshes.drawQuad()
			fbo.stopMapping()
		}


		StaticShaders.upSampling.bind()

		for (let i = 0; i < upscale.length; i++) {
			const fbo = upscale[i]
			this.#upSample(fbo, gl, i > 0 ? upscale[i - 1].colors[0] : undefined, downscale[downscale.length - 1 - i].colors[0])
		}
		 this.#upSample(StaticFBO.postProcessing2, gl, StaticFBO.postProcessing1Sampler, upscale[upscale.length - 1].colors[0])
		MetricsController.currentState = METRICS_FLAGS.BLOOM
	}

	#upSample(fbo: Framebuffer, gl: WebGL2RenderingContext, nextSampler: WebGLTexture, blurredSampler: WebGLTexture) {
		const upSamplingShaderUniforms = StaticShaders.upSamplingUniforms
		fbo.startMapping()

		GPUUtil.bind2DTextureForDrawing(upSamplingShaderUniforms.nextSampler, 0, nextSampler)
		GPUUtil.bind2DTextureForDrawing(upSamplingShaderUniforms.blurred, 1, blurredSampler)

		gl.uniform1f(upSamplingShaderUniforms.sampleScale, ProjectionEngine.Engine.getCamera().bloomOffset)
		StaticMeshes.drawQuad()
		fbo.stopMapping()
	}

}
