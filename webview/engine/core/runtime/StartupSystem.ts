import AbstractSystem from "@engine-core/AbstractSystem";
import GPU from "@engine-core/GPU";
import TransformationSystem from "@engine-core/runtime/TransformationSystem";
import LightsService from "@engine-core/lib/utils/LightsService";
import Renderer from "@engine-core/Renderer";

let previous
export default class StartupSystem extends AbstractSystem{
    execute(gl: WebGL2RenderingContext) {
        const current = Renderer.currentTimeStamp
        Renderer.elapsed = current - previous
        previous = current
        GPU.context.clear(GPU.context.COLOR_BUFFER_BIT | GPU.context.DEPTH_BUFFER_BIT)
        if (TransformationSystem.hasChangeBuffer[0] === 1)
            LightsService.packageLights(false, true)
    }
}