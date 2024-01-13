import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import CBStateDTO from "@lib/stores/state/CBStateDTO";

@Injectable
export default class ContentBrowserStore extends AbstractStore<CBStateDTO>{
	constructor() {
		super(new CBStateDTO())
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
