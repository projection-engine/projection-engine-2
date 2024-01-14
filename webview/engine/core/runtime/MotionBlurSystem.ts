import GPU from "../GPU"
import StaticMeshes from "../lib/StaticMeshes"
import StaticFBO from "../lib/StaticFBO"
import StaticShaders from "../lib/StaticShaders"
import MetricsController from "../lib/utils/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import AbstractSystem from "@engine-core/AbstractSystem";


export default class MotionBlurSystem extends AbstractSystem{
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

		GPU.context.uniform2fv(uniforms.bufferResolution, GPU.bufferResolution)

		GPU.context.uniform1f(uniforms.velocityScale, MotionBlurSystem.velocityScale)
		GPU.context.uniform1i(uniforms.maxSamples, MotionBlurSystem.maxSamples)

		StaticMeshes.drawQuad()
		StaticFBO.postProcessing1.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.MOTION_BLUR
	}
}
