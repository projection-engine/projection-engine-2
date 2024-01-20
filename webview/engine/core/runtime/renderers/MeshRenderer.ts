import MetricsController from "../../services/MetricsController"
import METRICS_FLAGS from "../../static/METRICS_FLAGS"
import SceneRenderer from "./SceneRenderer"
import StaticFBO from "../../repositories/StaticFBO"
import GPUAPI from "@engine-core/services/GPUAPI";
import GPU from "@engine-core/GPU";

export default class MeshRenderer {
	static execute(transparencyOnly: boolean) {
		if (!transparencyOnly) {
			SceneRenderer.drawOpaque()
			MetricsController.currentState = METRICS_FLAGS.OPAQUE
			return
		}
		GPUAPI.copyTexture(StaticFBO.postProcessing1, StaticFBO.postProcessing2, GPU.context.COLOR_BUFFER_BIT)
		StaticFBO.postProcessing2.use()
		SceneRenderer.drawTransparency()
		StaticFBO.postProcessing2.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.TRANSPARENCY
	}
}