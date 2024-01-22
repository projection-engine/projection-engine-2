import GPU from "../core/GPU"
import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import UBORepository from "../repositories/UBORepository"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class CompositionSystem extends AbstractEngineSystem {
    static lookUpRandom = new Float32Array(2e+3)
    static lookUpIndex = 0
    static currentNoise = 0

   async initialize() {
        UBORepository.frameCompositionUBO.bind()
        UBORepository.frameCompositionUBO.updateData("FXAASpanMax", new Float32Array([8.0]))
        UBORepository.frameCompositionUBO.updateData("FXAAReduceMin", new Float32Array([1.0 / 128.0]))
        UBORepository.frameCompositionUBO.updateData("FXAAReduceMul", new Float32Array([1.0 / 8.0]))
        UBORepository.frameCompositionUBO.updateData("inverseFilterTextureSize", new Float32Array([1 / GPU.internalResolution.w, 1 / GPU.internalResolution.h]))
        UBORepository.frameCompositionUBO.unbind()

        for (let i = 0; i < CompositionSystem.lookUpRandom.length; i++)
            CompositionSystem.lookUpRandom[i] = Math.random()
    }

    static lookup() {
        return ++CompositionSystem.lookUpIndex >= CompositionSystem.lookUpRandom.length ? CompositionSystem.lookUpRandom[CompositionSystem.lookUpIndex = 0] : CompositionSystem.lookUpRandom[CompositionSystem.lookUpIndex]
    }

    execute(gl: WebGL2RenderingContext) {
        const shader = ShaderRepository.composition, uniforms = ShaderRepository.compositionUniforms

        CompositionSystem.currentNoise = CompositionSystem.lookup()

        shader.bind()
        GPU.bind2DTextureForDrawing(uniforms.currentFrame, 0, FramebufferRepository.lensSampler)


        gl.uniform1f(uniforms.filmGrainSeed, CompositionSystem.currentNoise)
        StaticMeshRepository.drawQuad()
        MetricsController.currentState = METRICS_FLAGS.FRAME_COMPOSITION
    }
}
