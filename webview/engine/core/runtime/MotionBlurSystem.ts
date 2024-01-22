import GPU from "../core/GPU"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class MotionBlurSystem extends AbstractEngineSystem{
	static velocityScale = 1
	static maxSamples = 50
	static enabled = false

	 execute(gl: WebGL2RenderingContext) {

		if (!MotionBlurSystem.enabled)
			return
		FramebufferRepository.postProcessing1.startMapping()
		ShaderRepository.mb.bind()
		const uniforms = ShaderRepository.mbUniforms

		GPU.bind2DTextureForDrawing(uniforms.currentFrame, 0, FramebufferRepository.postProcessing2Sampler)

	 GPU.bind2DTextureForDrawing(uniforms.gVelocity, 1, FramebufferRepository.sceneDepthVelocity)

		GPU.context.uniform2fv(uniforms.bufferResolution, GPU.bufferResolution)

		GPU.context.uniform1f(uniforms.velocityScale, MotionBlurSystem.velocityScale)
		GPU.context.uniform1i(uniforms.maxSamples, MotionBlurSystem.maxSamples)

		StaticMeshRepository.drawQuad()
		FramebufferRepository.postProcessing1.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.MOTION_BLUR
	}
}
