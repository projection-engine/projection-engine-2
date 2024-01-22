import MetricsController from "../../services/MetricsController"
import METRICS_FLAGS from "../../static/METRICS_FLAGS"
import SceneRenderer from "./SceneRenderer"
import FramebufferRepository from "../../repositories/FramebufferRepository"
import GPUAPI from "@engine-core/services/GPUAPI";
import GPU from "@engine-core/core/GPU";

export default class MeshRenderer {
	static execute(transparencyOnly: boolean) {
		if (!transparencyOnly) {
			SceneRenderer.drawOpaque()
			MetricsController.currentState = METRICS_FLAGS.OPAQUE
			return
		}
		GPUAPI.copyTexture(FramebufferRepository.postProcessing1, FramebufferRepository.postProcessing2, GPU.context.COLOR_BUFFER_BIT)
		FramebufferRepository.postProcessing2.use()
		SceneRenderer.drawTransparency()
		FramebufferRepository.postProcessing2.stopMapping()
		MetricsController.currentState = METRICS_FLAGS.TRANSPARENCY
	}
}