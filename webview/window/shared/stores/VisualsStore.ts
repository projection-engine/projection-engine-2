import VISUAL_SETTINGS from "../../editor/static/VISUAL_SETTINGS"

import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../../ProjectionEngine";

export default class VisualsStore extends AbstractStore{
	static #wasInitialized = false

	constructor() {
		super(VISUAL_SETTINGS)
	}

	updateStore(value) {
		if (VisualsStore.#wasInitialized)
			ProjectionEngine.ChangesTrackerStore.updateStore({changed: true})
		VisualsStore.#wasInitialized = true
		super.updateStore(value)
	}
}

