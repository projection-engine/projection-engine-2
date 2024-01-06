import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../../ProjectionEngine";

export default class ContentBrowserStore extends AbstractStore{
	constructor() {
		super({
			selectedItems: [],
			items: [],
			textures: [],
			meshes: [],
			levels: [],
			materials: [],
			materialInstances: [],
			simpleMaterials: [],
			components: [],
			uiLayouts: [],
			terrains: [],
			terrainMaterials: [],
			toCut: [],
			collections: []
		})
	}

	static setContentBrowserSelected(data:MutableObject[]) {
		ProjectionEngine.ContentBrowserStore.updateStore({selectedItems: data})
	}

	static getContentBrowserSelected():MutableObject[] {
		return ProjectionEngine.ContentBrowserStore.getData().selectedItems
	}

	static getItemById(id:string){
		return ProjectionEngine.ContentBrowserStore.getData().items.find(item => item.id === id)
	}

}
