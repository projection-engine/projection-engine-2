import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../ProjectionEngine";
import SETTINGS from "../../window/editor/static/SETTINGS";

export default class SettingsStore extends AbstractStore{
	static #wasInitialized = false

	constructor() {
		super(SETTINGS)
	}

	updateStore(value) {
		if (SettingsStore.#wasInitialized)
			ProjectionEngine.ChangesTrackerStore.updateStore({changed: true})
		SettingsStore.#wasInitialized = true
		super.updateStore(value)
	}
}

