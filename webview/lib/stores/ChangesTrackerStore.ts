import AbstractStore from "./AbstractStore"


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

