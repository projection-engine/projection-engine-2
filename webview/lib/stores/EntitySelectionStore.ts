import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";

@Injectable
export default class EntitySelectionStore extends AbstractStore{
	constructor() {
		super({lockedEntity: undefined, array: []})
	}

	static setEntitiesSelected(data:string[]|string)	 {
		ProjectionEngine.EntitySelectionStore.updateStore({array: Array.isArray(data) ? data : [data]})
	}

	static getEntitiesSelected() {
		return ProjectionEngine.EntitySelectionStore.getData().array
	}

	static getMainEntity() {
		const lockedEntity = EntitySelectionStore.getLockedEntity()
		const firstSelected = EntitySelectionStore.getEntitiesSelected()[0]
		return firstSelected ? firstSelected : lockedEntity
	}

	static getLockedEntity() {
		return ProjectionEngine.EntitySelectionStore.getData().lockedEntity
	}

	static setLockedEntity(data:string) {
		ProjectionEngine.EntitySelectionStore.updateStore({lockedEntity: data})
	}
}
