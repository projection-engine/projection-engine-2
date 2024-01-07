import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import SelectionStateDTO from "@lib/stores/state/SelectionStateDTO";

@Injectable
export default class SelectionStore extends AbstractStore<SelectionStateDTO>{
	constructor() {
		super(new SelectionStateDTO())
	}

	static setEntitiesSelected(data:string[]|string)	 {
		ProjectionEngine.EntitySelectionStore.updateStore({array: Array.isArray(data) ? data : [data]})
	}

	static getEntitiesSelected() {
		return ProjectionEngine.EntitySelectionStore.getData().array
	}

	static getMainEntity() {
		const lockedEntity = SelectionStore.getLockedEntity()
		const firstSelected = SelectionStore.getEntitiesSelected()[0]
		return firstSelected ? firstSelected : lockedEntity
	}

	static getLockedEntity() {
		return ProjectionEngine.EntitySelectionStore.getData().lockedEntity
	}

	static setLockedEntity(data:string) {
		ProjectionEngine.EntitySelectionStore.updateStore({lockedEntity: data})
	}
}
