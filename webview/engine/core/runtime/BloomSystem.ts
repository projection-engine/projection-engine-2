import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import Framebuffer from "../instances/Framebuffer"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import GPU from "@engine-core/core/GPU";

export default class BloomSystem extends AbstractEngineSystem{
	 execute(gl: WebGL2RenderingContext) {

		if (!ProjectionEngine.Engine.getCamera().bloom)
			return
		FramebufferRepository.lens.startMapping()
		ShaderRepository.bloom.bind()
		 GPU.bind2DTextureForDrawing(ShaderRepository.bloomUniforms.sceneColor, 0, FramebufferRepository.postProcessing1Sampler)

		 gl.uniform1f(ShaderRepository.bloomUniforms.threshold, ProjectionEngine.Engine.getCamera().bloomThreshold)
		StaticMeshRepository.drawQuad()
		FramebufferRepository.lens.stopMapping()

		ShaderRepository.gaussian.bind()
		const downscale = FramebufferRepository.downscaleBloom
		const upscale = FramebufferRepository.upscaleBloom

		for (let i = 0; i < downscale.length; i++) {
			const fbo = downscale[i]
			fbo.startMapping()
			GPU.bind2DTextureForDrawing(ShaderRepository.gaussianUniforms.sceneColor, 0, i > 0 ? downscale[i - 1].colors[0] : FramebufferRepository.lensSampler)

			gl.uniform1f(ShaderRepository.gaussianUniforms.blurRadius, 10)
			gl.uniform1i(ShaderRepository.gaussianUniforms.samples, ProjectionEngine.Engine.getCamera().bloomQuality)
			gl.uniform2fv(ShaderRepository.gaussianUniforms.bufferResolution, fbo.resolution)

			StaticMeshRepository.drawQuad()
			fbo.stopMapping()
		}


		ShaderRepository.upSampling.bind()

		for (let i = 0; i < upscale.length; i++) {
			const fbo = upscale[i]
			this.#upSample(fbo, gl, i > 0 ? upscale[i - 1].colors[0] : undefined, downscale[downscale.length - 1 - i].colors[0])
		}
		 this.#upSample(FramebufferRepository.postProcessing2, gl, FramebufferRepository.postProcessing1Sampler, upscale[upscale.length - 1].colors[0])
		MetricsController.currentState = METRICS_FLAGS.BLOOM
	}

	#upSample(fbo: Framebuffer, gl: WebGL2RenderingContext, nextSampler: WebGLTexture, blurredSampler: WebGLTexture) {
		const upSamplingShaderUniforms = ShaderRepository.upSamplingUniforms
		fbo.startMapping()

		GPU.bind2DTextureForDrawing(upSamplingShaderUniforms.nextSampler, 0, nextSampler)
		GPU.bind2DTextureForDrawing(upSamplingShaderUniforms.blurred, 1, blurredSampler)

		gl.uniform1f(upSamplingShaderUniforms.sampleScale, ProjectionEngine.Engine.getCamera().bloomOffset)
		StaticMeshRepository.drawQuad()
		fbo.stopMapping()
	}

}
