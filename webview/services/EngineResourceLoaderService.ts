import FileSystemUtil from "@lib/FileSystemUtil"
import EditorFSUtil from "../window/editor/util/EditorFSUtil"

import COMPONENTS from "@engine-core/static/Components"
import DepthPickingService from "@engine-core/services/DepthPickingService"
import EntityQueryService from "@engine-core/services/EntityQueryService"
import EntityFactoryService from "./EntityFactoryService"
import GPU from "@engine-core/core/GPU"
import GPUAPI from "@engine-core/services/GPUAPI"

import FileSystemAPI from "@engine-core/services/FileSystemAPI"
import MeshComponent from "@engine-core/instances/components/MeshComponent"
import SpriteComponent from "@engine-core/instances/components/SpriteComponent"
import EngineStateService from "./EngineStateService"
import EntityAPI from "@engine-core/services/EntityAPI"
import FileTypes from "@enums/FileTypes"
import LocalizationEN from "@enums/LocalizationEN"
import Entity from "@engine-core/instances/Entity"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository";
import {Inject} from "@lib/Injection";
import ToasterService from "@services/ToasterService";


export default class EngineResourceLoaderService {

	@Inject(ToasterService)
	static toasterService: ToasterService
	
	static #initializeEntity(data: MutableObject, meshID: string, parent?: Entity, index?: number) {
		const entity = EntityAPI.getNewEntityInstance(data?.id)
		entity.name = data.name ? data.name : "primitive-" + (index || 0)
		try {
			entity.addParent(parent)
			entity.changed = true

			for (let i = 0; i < 16; i++)
				entity.baseTransformationMatrix[i] = data.baseTransformationMatrix[i]

			const comp = <MeshComponent>entity.addComponent(COMPONENTS.MESH)
			entity.addComponent(COMPONENTS.CULLING)
			comp.materialID = data.material
			comp.meshID = meshID
			return entity
		} catch (err) {
			console.error(err)
		}
	}

	static async mesh(objLoaded, id) {
		if (!objLoaded)
			return
		let materialID
		if (GPU.meshes.get(objLoaded.id))
			return
		try {
			GPUAPI.allocateMesh(id, objLoaded)
			const result = await FileSystemAPI.loadMaterial(objLoaded.material)
			if (result)
				materialID = objLoaded.material
		} catch (e) {
			console.error(e)
		}
		return materialID
	}

	static async scene(path) {
		const file = await FileSystemUtil.readFile(FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + path, "json")
		const entities = []
		const root = EntityAPI.getNewEntityInstance()
		root.name = path.replace(FileTypes.COLLECTION, "").split(FileSystemUtil.sep).pop()
		entities.push(root)
		EntityFactoryService.translateEntity(root)
		try {
			if (file) {
				for (let i = 0; i < file.entities.length; i++) {
					const currentEntity = file.entities[i]
					const entity = EngineResourceLoaderService.#initializeEntity(currentEntity, currentEntity.meshID)
					entity.parentID = currentEntity.parent || root.id
					entities.push(entity)
				}
				EngineStateService.appendBlock(entities)
			} else
				EngineResourceLoaderService.toasterService.error(LocalizationEN.COLLECTION_NOT_FOUND)
		} catch (error) {
			console.error(error)
		}
	}

	static async load(event, asID, mouseX?: number, mouseY?: number) {
		const items = [], entitiesToPush = []

		if (asID)
			items.push(event)
		else
			try {
				items.push(...JSON.parse(event))
			} catch (e) {
				console.error(e)
			}
		for (let i = 0; i < items.length; i++) {
			const data = items[i]
			if (!data)
				continue
			const res = EditorFSUtil.getRegistryEntry(data)
			if (!res)
				continue
			switch ("." + res.path.split(".").pop()) {
			case FileTypes.PRIMITIVE: {
				const file = await FileSystemUtil.readFile(FileSystemUtil.ASSETS_PATH + FileSystemUtil.sep + res.path, "json")
				const materialID = await EngineResourceLoaderService.mesh(file, data)
				const entity = EntityAPI.getNewEntityInstance()
				entity.name = "New primitive"
				const instance = entity.addComponent<MeshComponent>(COMPONENTS.MESH)
				entity.addComponent(COMPONENTS.CULLING)
				instance.materialID = materialID
				instance.meshID = data
				EntityFactoryService.translateEntity(entity)
				entitiesToPush.push(entity)

				break
			}
			case FileTypes.COLLECTION:
				await EngineResourceLoaderService.scene(res.path)
				break
			case FileTypes.TEXTURE: {
				if(data)
					await FileSystemAPI.loadTexture(data)
				const sprite = EntityAPI.getNewEntityInstance()
				sprite.name = LocalizationEN.SPRITE_RENDERER
				EntityFactoryService.translateEntity(sprite)
				sprite.addComponent<SpriteComponent>(COMPONENTS.SPRITE).imageID = data
				EngineStateService.add(sprite)
				break
			}

			case FileTypes.MATERIAL: {
				const entity = EntityQueryService.getEntityByPickerID(DepthPickingService.readEntityID(mouseX, mouseY, 1, FramebufferRepository.visibility.FBO))
				if (!entity || !entity.meshComponent) return
				const result = await FileSystemAPI.loadMaterial(data)
				if (result) {
					const component = entity.meshComponent
					component.materialID = data
				} else
					console.error(LocalizationEN.SOME_ERROR_OCCURRED + ` (Material: ${data})`)
				break
			}
			default:
				console.error(new Error("Not valid file type"))
				break
			}
		}

		if (entitiesToPush.length > 0) {
			EngineStateService.appendBlock(entitiesToPush)
			EngineResourceLoaderService.toasterService.success(LocalizationEN.ENTITIES_CREATED)
		}
	}

}
