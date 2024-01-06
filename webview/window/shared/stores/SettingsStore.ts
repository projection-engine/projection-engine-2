import SETTINGS from "../../editor/static/SETTINGS"
import ChangesTrackerStore from "./ChangesTrackerStore"
import UIDataStores from "../../../enums/UIDataStores"
import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../../ProjectionEngine";

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

