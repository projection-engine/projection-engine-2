import StaticMeshRepository from "../repositories/StaticMeshRepository"
import FramebufferRepository from "../repositories/FramebufferRepository"
import ShaderRepository from "../repositories/ShaderRepository"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import GPU from "@engine-core/core/GPU";


export default class LensPostProcessing extends AbstractEngineSystem {

    execute(gl: WebGL2RenderingContext) {

        FramebufferRepository.lens.startMapping()
        ShaderRepository.lens.bind()
        GPU.bind2DTextureForDrawing(ShaderRepository.lensUniforms.bloomColor, 0, FramebufferRepository.postProcessing2Sampler)

        GPU.bind2DTextureForDrawing(ShaderRepository.lensUniforms.sceneColor, 1, FramebufferRepository.postProcessing1Sampler)

        StaticMeshRepository.drawQuad()
        FramebufferRepository.lens.stopMapping()
        MetricsController.currentState = METRICS_FLAGS.LENS
    }

}
