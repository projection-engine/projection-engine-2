import Material from "../instances/Material"
import Entity from "../instances/Entity"
import GPU from "../core/GPU"
import ResourceMapper from "../lib/ResourceMapper"


type Resource = { material: Material, entities: Entity[], entitiesMap: Map<string, Entity> }[]
export default class MaterialRepository {
	static #mapper = new ResourceMapper("material")

	static get materialsArray(): Resource {
		return <Resource>MaterialRepository.#mapper.dataMap
	}

	static removeBlock(entities: Entity[]) {
		MaterialRepository.#mapper.removeBlock(entities)
	}

	static unlinkEntityMaterial(entityID: string) {
		MaterialRepository.#mapper.unlink(entityID)
	}

	static deleteMaterial(meshID: string) {
		const oldRef = this.#mapper.delete(meshID)
		oldRef.forEach(e => {
			e.meshComponent.materialID = undefined
		})
	}

	static linkEntityMaterial(entity: Entity, materialID: string) {
		let index = MaterialRepository.materialsArray.findIndex(m => m.material.id === materialID)
		if (index < 0 && !GPU.materials.has(materialID))
			return
		if (index < 0) {
			MaterialRepository.materialsArray.push({
				material: GPU.materials.get(materialID),
				entitiesMap: new Map(),
				entities: []
			})
			index = MaterialRepository.materialsArray.length - 1
		}
		const instance = MaterialRepository.materialsArray[index]
		if (instance.entitiesMap.has(entity.id))
			return
		instance.entities.push(entity)
		instance.entitiesMap.set(entity.id, entity)
	}


}