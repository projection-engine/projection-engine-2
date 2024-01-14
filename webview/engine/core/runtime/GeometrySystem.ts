import StaticFBO from "../lib/StaticFBO"
import UberShader from "../lib/UberShader"
import SceneRenderer from "./renderers/SceneRenderer"
import SpriteRenderer from "./renderers/SpriteRenderer"
import DecalRenderer from "./renderers/DecalRenderer"
import MeshRenderer from "./renderers/MeshRenderer"
import AtmosphereRenderer from "./renderers/AtmosphereRenderer"
import Mesh from "../instances/Mesh"
import GPU from "../GPU"
import AbstractSystem from "@engine-core/AbstractSystem";


export default class GeometrySystem extends AbstractSystem {
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