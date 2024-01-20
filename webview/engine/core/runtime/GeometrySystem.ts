import StaticFBO from "../repositories/StaticFBO"
import UberShader from "../repositories/UberShader"
import SceneRenderer from "./renderers/SceneRenderer"
import SpriteRenderer from "./renderers/SpriteRenderer"
import DecalRenderer from "./renderers/DecalRenderer"
import MeshRenderer from "./renderers/MeshRenderer"
import AtmosphereRenderer from "./renderers/AtmosphereRenderer"
import Mesh from "../instances/Mesh"
import IEngineSystem from "@engine-core/IEngineSystem";


export default class GeometrySystem extends IEngineSystem {
    execute(gl: WebGL2RenderingContext) {
        if (!UberShader.uber)
            return
        gl.flush()

        Mesh.finishIfUsed()
        StaticFBO.postProcessing2.startMapping()

        AtmosphereRenderer.execute()
        SceneRenderer.bindGlobalResources()
        MeshRenderer.execute(false)
        DecalRenderer.execute()
        SpriteRenderer.execute()

        StaticFBO.postProcessing2.stopMapping()

        MeshRenderer.execute(true)
        gl.flush()
    }

}