import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import GPUService from "@engine-core/services/GPUService";
import TransformationSystem from "@engine-core/runtime/TransformationSystem";
import LightsService from "@engine-core/services/LightsService";
import ProjectionEngine from "@lib/ProjectionEngine";

let previous
export default class StartupSystem extends AbstractEngineSystem{
    execute(gl: WebGL2RenderingContext) {
        const current = ProjectionEngine.Engine.currentTimeStamp
        this.engine.elapsed = current - previous
        previous = current
        GPUService.context.clear(GPUService.context.COLOR_BUFFER_BIT | GPUService.context.DEPTH_BUFFER_BIT)
        if (TransformationSystem.isChanged)
            LightsService.packageLights(false, true)
    }
}