import Physics from "../runtime/Physics"
import UBORepository from "../repositories/UBORepository"
import DepthPrePassSystem from "../runtime/DepthPrePassSystem"
import EngineState from "../EngineState"
import SSGISystem from "../runtime/SSGISystem"
import FramebufferRepository from "../repositories/FramebufferRepository"
import DirectionalShadowsSystem from "../runtime/DirectionalShadowsSystem"


export default class EngineResources {
	static #INTEGER_BUFFER = new Uint8Array(1)
	static #FLOAT_BUFFER = new Float32Array(1)
	static #SSAO_BUFFER = new Float32Array([EngineState.ssaoRadius, EngineState.ssaoPower, EngineState.ssaoBias, EngineState.ssaoFalloffDistance])

	static updateParams() {
		Physics.stop()
		Physics.start()

		SSGISystem.uniformSettings[0] = EngineState.ssgiStepSize
		SSGISystem.uniformSettings[1] = EngineState.ssgiMaxSteps
		SSGISystem.uniformSettings[2] = EngineState.ssgiStrength

		UBORepository.uberUBO.bind()
		EngineResources.#FLOAT_BUFFER[0] = EngineState.ssrFalloff
		UBORepository.uberUBO.updateData("SSRFalloff", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.ssrStepSize
		UBORepository.uberUBO.updateData("stepSizeSSR", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.sssMaxDistance
		UBORepository.uberUBO.updateData("maxSSSDistance", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.sssDepthThickness
		UBORepository.uberUBO.updateData("SSSDepthThickness", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.sssEdgeFalloff
		UBORepository.uberUBO.updateData("SSSEdgeAttenuation", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.sssDepthDelta
		UBORepository.uberUBO.updateData("SSSDepthDelta", EngineResources.#FLOAT_BUFFER)
		EngineResources.#INTEGER_BUFFER[0] = EngineState.ssrMaxSteps
		UBORepository.uberUBO.updateData("maxStepsSSR", EngineResources.#INTEGER_BUFFER)
		EngineResources.#INTEGER_BUFFER[0] = EngineState.sssMaxSteps
		UBORepository.uberUBO.updateData("maxStepsSSS", EngineResources.#INTEGER_BUFFER)
		EngineResources.#INTEGER_BUFFER[0] = EngineState.ssaoEnabled ? 1 : 0
		UBORepository.uberUBO.updateData("hasAmbientOcclusion", EngineResources.#INTEGER_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.ssaoFalloffDistance
		UBORepository.uberUBO.updateData("SSAOFalloff", EngineResources.#FLOAT_BUFFER)
		UBORepository.uberUBO.unbind()


		EngineResources.#SSAO_BUFFER[0] = EngineState.ssaoRadius
		EngineResources.#SSAO_BUFFER[1] = EngineState.ssaoPower
		EngineResources.#SSAO_BUFFER[2] = EngineState.ssaoBias
		EngineResources.#SSAO_BUFFER[3] = EngineState.ssaoFalloffDistance

		UBORepository.ssaoUBO.bind()
		UBORepository.ssaoUBO.updateData("settings", EngineResources.#SSAO_BUFFER)
		UBORepository.ssaoUBO.unbind()


		UBORepository.frameCompositionUBO.bind()
		EngineResources.#FLOAT_BUFFER[0] = EngineState.fxaaSpanMax
		UBORepository.frameCompositionUBO.updateData("FXAASpanMax", EngineResources.#FLOAT_BUFFER)
		EngineResources.#INTEGER_BUFFER[0] = EngineState.fxaaEnabled ? 1 : 0
		UBORepository.frameCompositionUBO.updateData("useFXAA", EngineResources.#INTEGER_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.fxaaReduceMin
		UBORepository.frameCompositionUBO.updateData("FXAAReduceMin", EngineResources.#FLOAT_BUFFER)
		EngineResources.#FLOAT_BUFFER[0] = EngineState.fxaaReduceMul
		UBORepository.frameCompositionUBO.updateData("FXAAReduceMul", EngineResources.#FLOAT_BUFFER)
		UBORepository.frameCompositionUBO.unbind()

		DepthPrePassSystem.needsUpdate = true
		EngineResources.#allocateDirectionalShadowsBuffers()

		DirectionalShadowsSystem.resolutionPerTexture = DirectionalShadowsSystem.maxResolution / (EngineState.shadowAtlasQuantity || 1)
		DirectionalShadowsSystem.atlasRatio = DirectionalShadowsSystem.maxResolution / DirectionalShadowsSystem.resolutionPerTexture
		UBORepository.uberUBO.bind()
		UBORepository.uberUBO.updateData("shadowMapsQuantity", new Float32Array([EngineState.shadowAtlasQuantity]))
		UBORepository.uberUBO.updateData("shadowMapResolution", new Float32Array([EngineState.shadowMapResolution]))
		UBORepository.uberUBO.unbind()
	}

	static #allocateDirectionalShadowsBuffers() {
		if (DirectionalShadowsSystem.maxResolution === EngineState.shadowMapResolution || EngineState.shadowMapResolution < 1024)
			return
		DirectionalShadowsSystem.maxResolution = EngineState.shadowMapResolution
		FramebufferRepository.updateDirectionalShadowsFBO()
		DirectionalShadowsSystem.changed = true
	}

}