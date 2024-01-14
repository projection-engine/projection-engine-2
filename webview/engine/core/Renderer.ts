import SSGISystem from "./runtime/SSGISystem"
import DirectionalShadowsSystem from "./runtime/DirectionalShadowsSystem"
import LensPostProcessing from "./runtime/LensPostProcessing"
import CompositionSystem from "./runtime/CompositionSystem"

import Engine from "./Engine"
import TransformationSystem from "./runtime/TransformationSystem"
import PointShadowsSystem from "./runtime/PointShadowsSystem"
import CameraAPI from "./lib/utils/CameraAPI"
import MetricsController from "./lib/utils/MetricsController"

import DepthPrePassSystem from "./runtime/DepthPrePassSystem"
import LightsService from "./lib/utils/LightsService"
import GeometrySystem from "./runtime/GeometrySystem"
import GPU from "./GPU"
import GPUAPI from "./lib/rendering/GPUAPI"
import StaticFBO from "./lib/StaticFBO"
import ScriptsAPI from "./lib/utils/ScriptsAPI"
import METRICS_FLAGS from "./static/METRICS_FLAGS"
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractSystem from "@engine-core/AbstractSystem";
import CameraSystem from "@engine-core/runtime/CameraSystem";
import DoFSystem from "@engine-core/runtime/DoFSystem";
import MotionBlurSystem from "@engine-core/runtime/MotionBlurSystem";
import BloomSystem from "@engine-core/runtime/BloomSystem";
import ScriptingSystem from "@engine-core/runtime/ScriptingSystem";
import StartupSystem from "@engine-core/runtime/StartupSystem";

let previous = 0

export default class Renderer extends AbstractSystem{
	static elapsed = 0
	static currentTimeStamp = 0

	static copyToCurrentFrame() {
		GPUAPI.copyTexture(StaticFBO.postProcessing1, StaticFBO.postProcessing2, GPU.context.COLOR_BUFFER_BIT)
	}

	execute(gl: WebGL2RenderingContext) {
		CameraSystem.execute()
		StartupSystem.execute()
		ScriptingSystem.execute()
		DirectionalShadowsSystem.execute()
		PointShadowsSystem.execute()
		DepthPrePassSystem.execute()
		GeometrySystem.execute()
		SSGISystem.execute()
		DoFSystem.execute()
		MotionBlurSystem.execute()
		BloomSystem.execute()
		LensPostProcessing.execute()
		CompositionSystem.execute()
		TransformationSystem.execute()
	}

}