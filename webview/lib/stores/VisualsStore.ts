import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../ProjectionEngine";
import VISUAL_SETTINGS from "../../window/editor/static/VISUAL_SETTINGS";

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

