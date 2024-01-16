import GPU from "../GPU"
import StaticMeshes from "../lib/StaticMeshes"
import StaticFBO from "../lib/StaticFBO"
import StaticShaders from "../lib/StaticShaders"
import BloomSystem from "./BloomSystem"
import DoFSystem from "./DoFSystem"
import MotionBlurSystem from "./MotionBlurSystem"
import MetricsController from "../lib/utils/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import IEngineSystem from "@engine-core/IEngineSystem";


export default class LensPostProcessing extends IEngineSystem{

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
