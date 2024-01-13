import AbstractStore from "./AbstractStore"
import {Injectable, InjectVar} from "@lib/Injection";
import SelectionStateDTO from "@lib/stores/state/SelectionStateDTO";

@Injectable
export default class SelectionStore extends AbstractStore<SelectionStateDTO>{
	constructor() {
		super(new SelectionStateDTO())
	}

	static setEntitiesSelected(data:string[]|string)	 {
		InjectVar(SelectionStore).updateStore({array: Array.isArray(data) ? data : [data]})
	}

	static getEntitiesSelected() {
		return InjectVar(SelectionStore).getData().array
	}

	static getMainEntity() {
		const lockedEntity = SelectionStore.getLockedEntity()
		const firstSelected = SelectionStore.getEntitiesSelected()[0]
		return firstSelected ? firstSelected : lockedEntity
	}

	static getLockedEntity() {
		return InjectVar(SelectionStore).getData().lockedEntity
	}

	static setLockedEntity(data:string) {
		InjectVar(SelectionStore).updateStore({lockedEntity: data})
	}
}
