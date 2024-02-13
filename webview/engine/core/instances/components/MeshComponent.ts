import Component from "./Component"

import MaterialAPI from "../../services/MaterialAPI"
import GPU from "../../core/GPU"
import FileSystemAPI from "../../services/FileSystemAPI"
import MeshRepository from "../../repositories/MeshRepository"
import MaterialRepository from "../../repositories/MaterialRepository"
import MaterialUniform from "../../static/MaterialUniform"
import EntityAPI from "../../services/EntityAPI"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class MeshComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.MESH
	}
	get componentKey(): string {
		return MeshComponent.componentKey
	}

	castsShadows = true
	_meshID?: string
	_materialID?: string
	#texturesInUse = {}
	_mappedUniforms = {}
	#materialUniforms: MaterialUniform[] = []
	contributeToProbes = true
	overrideMaterialUniforms = false

	updateMaterialUniformValue(key: string, value: any) {
		this._mappedUniforms[key] = value
	}

	get mappedUniforms() {
		return this._mappedUniforms
	}

	updateComponentReferences() {
		if (this._meshID)
			this.#bindMesh(this._meshID)
		if (this._materialID)
			this.#bindMaterial(this._materialID)
	}

	#bindMesh(meshID: string) {
		if (!EntityAPI.isRegistered(this.entity) || !meshID) return
		const found = GPU.meshes.get(meshID)
		if (!found)
			FileSystemAPI.loadMesh(meshID).then(_ => {
				const found = GPU.meshes.get(meshID)
				if (!found) {
					console.error("Mesh not found")
					return
				}
				this.entity.meshRef = found
				MeshRepository.linkEntityMesh(this.entity, meshID)

			})
		else {
			this.entity.meshRef = found
			MeshRepository.linkEntityMesh(this.entity, meshID)
		}
	}

	set meshID(meshID) {
		this._meshID = meshID

		const entity = this.entity
		if (!EntityAPI.isRegistered(entity)) return

		if (meshID)
			this.#bindMesh(meshID)
		else {
			MeshRepository.unlinkEntityMesh(this.entity.id)
			this.entity.meshRef = undefined
		}
	}

	get meshID() {
		return this._meshID
	}

	#bindMaterial(materialID: string) {
		if (!EntityAPI.isRegistered(this.entity) || !materialID) return
		const found = GPU.materials.get(materialID)
		if (!found)
			FileSystemAPI.loadMaterial(materialID).then(_ => {
				const found = GPU.materials.get(materialID)
				if (!found) {
					console.error("Material not found")
					return
				}
				this.entity.materialRef = found
				this.#materialUniforms = this.entity.materialRef.uniforms
				this._mappedUniforms = {}
				MaterialAPI.mapUniforms(this.#materialUniforms, this.#texturesInUse, this._mappedUniforms).catch(console.error)
				MaterialRepository.linkEntityMaterial(this.entity, materialID)

			})
		else {
			this.entity.materialRef = found
			this.#materialUniforms = this.entity.materialRef.uniforms
			this._mappedUniforms = {}
			MaterialAPI.mapUniforms(this.#materialUniforms, this.#texturesInUse, this._mappedUniforms).catch(console.error)
			MaterialRepository.linkEntityMaterial(this.entity, materialID)
		}
	}

	set materialID(materialID) {
		this._materialID = materialID
		const entity = this.entity
		if (!EntityAPI.isRegistered(entity)) return

		if (materialID)
			this.#bindMaterial(materialID)
		else {
			MaterialRepository.unlinkEntityMaterial(this.entity.id)
			this.entity.materialRef = undefined
		}
	}

	get materialUniforms(): MaterialUniform[] {
		return this.#materialUniforms
	}

	get hasMesh(): boolean {
		return this._meshID !== undefined
	}

	get hasMaterial(): boolean {
		return this._materialID !== undefined
	}

	get materialID() {
		return this._materialID
	}

}

RepositoryService.serializable(MeshComponent)
