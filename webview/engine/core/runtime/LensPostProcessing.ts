import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class LensPostProcessing extends AbstractEngineSystem{

	 execute(gl: WebGL2RenderingContext) {

		StaticFBO.lens.startMapping()
		StaticShaders.lens.bind()
		GPUUtil.bind2DTextureForDrawing(StaticShaders.lensUniforms.bloomColor, 0, StaticFBO.postProcessing2Sampler)

		GPUUtil.bind2DTextureForDrawing(StaticShaders.lensUniforms.sceneColor, 1, StaticFBO.postProcessing1Sampler)

		StaticMeshes.drawQuad()
		StaticFBO.lens.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.LENS
	}

}
