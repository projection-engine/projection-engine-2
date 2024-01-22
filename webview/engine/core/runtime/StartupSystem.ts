import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import GPU from "@engine-core/core/GPU";
import TransformationSystem from "@engine-core/runtime/TransformationSystem";
import LightsService from "@engine-core/services/LightsService";
import ProjectionEngine from "@lib/ProjectionEngine";

let previous
export default class StartupSystem extends AbstractEngineSystem{
    execute(gl: WebGL2RenderingContext) {
        const current = ProjectionEngine.Engine.currentTimeStamp
        this.engine.elapsed = current - previous
        previous = current
        GPU.context.clear(GPU.context.COLOR_BUFFER_BIT | GPU.context.DEPTH_BUFFER_BIT)
        if (TransformationSystem.isChanged)
            LightsService.packageLights(false, true)
    }
}