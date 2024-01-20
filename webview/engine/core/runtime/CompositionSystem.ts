import GPUService from "../services/GPUService"
import StaticMeshes from "../repositories/StaticMeshes"
import StaticFBO from "../repositories/StaticFBO"
import StaticShaders from "../repositories/StaticShaders"
import StaticUBOs from "../repositories/StaticUBOs"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import GPUUtil from "../utils/GPUUtil";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class CompositionSystem extends AbstractEngineSystem {
    static lookUpRandom = new Float32Array(2e+3)
    static lookUpIndex = 0
    static currentNoise = 0

   async initialize() {
        StaticUBOs.frameCompositionUBO.bind()
        StaticUBOs.frameCompositionUBO.updateData("FXAASpanMax", new Float32Array([8.0]))
        StaticUBOs.frameCompositionUBO.updateData("FXAAReduceMin", new Float32Array([1.0 / 128.0]))
        StaticUBOs.frameCompositionUBO.updateData("FXAAReduceMul", new Float32Array([1.0 / 8.0]))
        StaticUBOs.frameCompositionUBO.updateData("inverseFilterTextureSize", new Float32Array([1 / GPUService.internalResolution.w, 1 / GPUService.internalResolution.h]))
        StaticUBOs.frameCompositionUBO.unbind()

        for (let i = 0; i < CompositionSystem.lookUpRandom.length; i++)
            CompositionSystem.lookUpRandom[i] = Math.random()
    }

    static lookup() {
        return ++CompositionSystem.lookUpIndex >= CompositionSystem.lookUpRandom.length ? CompositionSystem.lookUpRandom[CompositionSystem.lookUpIndex = 0] : CompositionSystem.lookUpRandom[CompositionSystem.lookUpIndex]
    }

    execute(gl: WebGL2RenderingContext) {
        const shader = StaticShaders.composition, uniforms = StaticShaders.compositionUniforms

        CompositionSystem.currentNoise = CompositionSystem.lookup()

        shader.bind()
        GPUUtil.bind2DTextureForDrawing(uniforms.currentFrame, 0, StaticFBO.lensSampler)


        gl.uniform1f(uniforms.filmGrainSeed, CompositionSystem.currentNoise)
        StaticMeshes.drawQuad()
        MetricsController.currentState = METRICS_FLAGS.FRAME_COMPOSITION
    }
}
