import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import ProjectionEngine from "@lib/ProjectionEngine";
import IEngineSystem from "@engine-core/IEngineSystem";


export default class DoFSystem extends IEngineSystem{
	 execute(gl: WebGL2RenderingContext) {

		if (!ProjectionEngine.Engine.getCamera().DOF)
			return

		StaticShaders.bokeh.bind()
		StaticFBO.postProcessing2.startMapping()

		GPUUtil.bind2DTextureForDrawing(StaticShaders.bokehUniforms.sceneColor, 0,StaticFBO.postProcessing1Sampler)
		GPUUtil.bind2DTextureForDrawing(StaticShaders.bokehUniforms.sceneDepth, 1,StaticFBO.sceneDepthVelocity)
		StaticMeshes.drawQuad()
		StaticFBO.postProcessing2.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.BOKEH
	}
}
