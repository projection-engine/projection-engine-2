import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import GPU from "@engine-core/core/GPU";


export default class DoFSystem extends AbstractEngineSystem{
	 execute(gl: WebGL2RenderingContext) {

		if (!ProjectionEngine.Engine.getCamera().DOF)
			return

		ShaderRepository.bokeh.bind()
		FramebufferRepository.postProcessing2.startMapping()

		 GPU.bind2DTextureForDrawing(ShaderRepository.bokehUniforms.sceneColor, 0,FramebufferRepository.postProcessing1Sampler)
		 GPU.bind2DTextureForDrawing(ShaderRepository.bokehUniforms.sceneDepth, 1,FramebufferRepository.sceneDepthVelocity)
		StaticMeshRepository.drawQuad()
		FramebufferRepository.postProcessing2.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.BOKEH
	}
}
