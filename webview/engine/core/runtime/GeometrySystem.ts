import FramebufferRepository from "../repositories/FramebufferRepository"
import UberShaderService from "../services/UberShaderService"
import SceneRenderer from "./renderers/SceneRenderer"
import SpriteRenderer from "./renderers/SpriteRenderer"
import DecalRenderer from "./renderers/DecalRenderer"
import MeshRenderer from "./renderers/MeshRenderer"
import AtmosphereRenderer from "./renderers/AtmosphereRenderer"
import Mesh from "../instances/Mesh"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";


export default class GeometrySystem extends AbstractEngineSystem {
    execute(gl: WebGL2RenderingContext) {
        if (!UberShaderService.uber)
            return
        gl.flush()

        Mesh.finishIfUsed()
        FramebufferRepository.postProcessing2.startMapping()

        AtmosphereRenderer.execute()
        SceneRenderer.bindGlobalResources()
        MeshRenderer.execute(false)
        DecalRenderer.execute()
        SpriteRenderer.execute()

        FramebufferRepository.postProcessing2.stopMapping()

        MeshRenderer.execute(true)
        gl.flush()
    }

}