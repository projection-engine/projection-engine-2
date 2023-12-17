import StaticFBO from "../lib/StaticFBO"
import UberShader from "../resource-libs/UberShader"
import SceneRenderer from "./renderers/SceneRenderer"
import SpriteRenderer from "./renderers/SpriteRenderer"
import DecalRenderer from "./renderers/DecalRenderer"
import MeshRenderer from "./renderers/MeshRenderer"
import AtmosphereRenderer from "./renderers/AtmosphereRenderer"
import Mesh from "../instances/Mesh"
import GPU from "../GPU"


export default class SceneComposition {
	static execute() {
		if (!UberShader.uber)
			return
		GPU.context.flush()

		Mesh.finishIfUsed()
		StaticFBO.postProcessing2.startMapping()

		AtmosphereRenderer.execute()
		SceneRenderer.bindGlobalResources()
		MeshRenderer.execute(false)
		DecalRenderer.execute()
		SpriteRenderer.execute()

		StaticFBO.postProcessing2.stopMapping()

		MeshRenderer.execute(true)
		GPU.context.flush()
	}

}