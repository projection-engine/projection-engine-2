import Mesh from "../instances/Mesh"
import Entity from "../instances/Entity"
import GPU from "../core/GPU"
import ResourceMapper from "../lib/ResourceMapper"

type Resource = { mesh: Mesh, entities: Entity[], entitiesMap: Map<string, Entity> }[]
export default class MeshRepository {
	static #mapper = new ResourceMapper("mesh")

	static inUse = new Map<string, number>()

	static get meshesArray(): Resource {
		return <Resource>MeshRepository.#mapper.dataMap
	}

	static removeBlock(entities: Entity[]) {
		const found = MeshRepository.#mapper.removeBlock(entities)
		for (let i = 0; i < found.length; i++) {
			const f = found[i]
			MeshRepository.inUse.set(f.mesh.id, f.entities.length)
		}
	}

	static unlinkEntityMesh(entityID: string) {
		const found = MeshRepository.#mapper.unlink(entityID)
		for (let i = 0; i < found.length; i++) {
			const f = found[i]
			MeshRepository.inUse.set(f.mesh.id, f.entities.length)
		}
	}

	static linkEntityMesh(entity: Entity, meshID: string) {
		let index = MeshRepository.meshesArray.findIndex(m => m.mesh.id === meshID)
		if (index < 0 && !GPU.meshes.has(meshID))
			return

		if (index < 0) {
			MeshRepository.meshesArray.push({mesh: GPU.meshes.get(meshID), entitiesMap: new Map(), entities: []})
			index = MeshRepository.meshesArray.length - 1
		}
		MeshRepository.inUse.set(meshID, (MeshRepository.inUse.get(meshID) ?? 0) + 1)
		const instance = MeshRepository.meshesArray[index]
		if (instance.entitiesMap.has(entity.id))
			return
		instance.entities.push(entity)
		instance.entitiesMap.set(entity.id, entity)
	}

	static deleteMesh(meshID: string) {
		const oldRef = this.#mapper.delete(meshID)
		MeshRepository.inUse.delete(meshID)
		oldRef.forEach(e => {
			e.meshComponent.meshID = undefined
		})
	}
}