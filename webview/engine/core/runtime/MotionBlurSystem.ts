import GPUService from "../services/GPUService"
import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class MotionBlurSystem extends AbstractEngineSystem{
	static velocityScale = 1
	static maxSamples = 50
	static enabled = false

	 execute(gl: WebGL2RenderingContext) {

		if (!MotionBlurSystem.enabled)
			return
		StaticFBO.postProcessing1.startMapping()
		StaticShaders.mb.bind()
		const uniforms = StaticShaders.mbUniforms

		GPUUtil.bind2DTextureForDrawing(uniforms.currentFrame, 0, StaticFBO.postProcessing2Sampler)

		GPUUtil.bind2DTextureForDrawing(uniforms.gVelocity, 1, StaticFBO.sceneDepthVelocity)

		GPUService.context.uniform2fv(uniforms.bufferResolution, GPUService.bufferResolution)

		GPUService.context.uniform1f(uniforms.velocityScale, MotionBlurSystem.velocityScale)
		GPUService.context.uniform1i(uniforms.maxSamples, MotionBlurSystem.maxSamples)

		StaticMeshes.drawQuad()
		StaticFBO.postProcessing1.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.MOTION_BLUR
	}
}
