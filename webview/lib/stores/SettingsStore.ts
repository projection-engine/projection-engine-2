import AbstractStore from "./AbstractStore"
import ProjectionEngine, {Injectable} from "../ProjectionEngine";
import SETTINGS from "../../window/editor/static/SETTINGS";

@Injectable
export default class SettingsStore extends AbstractStore{
	constructor() {
		super(SETTINGS)
	}

	updateStore(value) {
		super.updateStore(value)
	}
}

