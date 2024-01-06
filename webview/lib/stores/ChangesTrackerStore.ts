import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/ProjectionEngine";


@Injectable
export default class ChangesTrackerStore extends AbstractStore{

	constructor() {
		super({})
	}

	updateStore(value?:{changed: boolean}) {
		if(this.getData().changed === value.changed)
			return
		super.updateStore(value)
	}
}

