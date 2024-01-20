import GPUService from "../services/GPUService"
import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import StaticUBOs from "../repositories/StaticUBOs"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import EngineState from "../EngineState"
import GPUUtil from "../utils/GPUUtil";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class SSAO extends AbstractEngineSystem{
	static noiseScale = new Float32Array(2)

	 async initialize() {
		const RESOLUTION = 4
		SSAO.noiseScale[0] = GPUService.internalResolution.w / RESOLUTION
		SSAO.noiseScale[1] = GPUService.internalResolution.h / RESOLUTION

		StaticUBOs.ssaoUBO.bind()
		StaticUBOs.ssaoUBO.updateData("settings", new Float32Array([.5, .7, -.1, 1000]))
		StaticUBOs.ssaoUBO.updateData("noiseScale", SSAO.noiseScale)
		StaticUBOs.ssaoUBO.unbind()

		await StaticFBO.generateSSAONoise()
	}

	static #draw() {
		StaticFBO.ssao.startMapping()
		StaticShaders.ssao.bind()


		GPUUtil.bind2DTextureForDrawing(StaticShaders.ssaoUniforms.sceneDepth, 0, StaticFBO.sceneDepthVelocity)

		GPUUtil.bind2DTextureForDrawing(StaticShaders.ssaoUniforms.noiseSampler, 1, StaticFBO.noiseSampler)

		GPUService.context.uniform1i(StaticShaders.ssaoUniforms.maxSamples, EngineState.ssaoMaxSamples)

		StaticMeshes.drawQuad()
		StaticFBO.ssao.stopMapping()
	}

	static #blur() {
		StaticShaders.boxBlur.bind()
		StaticFBO.ssaoBlurred.startMapping()

		GPUUtil.bind2DTextureForDrawing(StaticShaders.boxBlurUniforms.sampler, 0, StaticFBO.ssaoSampler)

		GPUService.context.uniform1i(StaticShaders.boxBlurUniforms.samples, EngineState.ssaoBlurSamples)

		StaticMeshes.drawQuad()
		StaticFBO.ssaoBlurred.stopMapping()
	}

	static execute() {
		if (!EngineState.ssaoEnabled)
			return

		SSAO.#draw()
		SSAO.#blur()

		MetricsController.currentState = METRICS_FLAGS.SSAO
	}

}

