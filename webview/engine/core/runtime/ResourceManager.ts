import GPU from "../GPU"
import GPUAPI from "../services/GPUAPI"
import MeshResourceMapper from "../repositories/MeshResourceMapper"

const THRESHOLD = 120000
const INTERVAL = 120000
export default class ResourceManager {
	static #interval = null

	static start() {
		clearInterval(ResourceManager.#interval)
		ResourceManager.#interval = setInterval(ResourceManager.execute, INTERVAL)
	}

	static stop() {
		clearInterval(ResourceManager.#interval)
		ResourceManager.#interval = null
	}

	static execute() {
		const meshes = GPU.meshes.array
		for (let i = 0; i < meshes.length; i++) {
			const current = meshes[i]
			const inUse = MeshResourceMapper.inUse.get(current.id)
			if (!inUse)
				GPUAPI.destroyMesh(current)
		}
	}
}
