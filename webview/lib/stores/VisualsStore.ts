import AbstractStore from "./AbstractStore"
import ProjectionEngine, {Injectable} from "../ProjectionEngine";
import VISUAL_SETTINGS from "../../window/editor/static/VISUAL_SETTINGS";

@Injectable
export default class VisualsStore extends AbstractStore{
	constructor() {
		super(VISUAL_SETTINGS)
	}

	updateStore(value) {
		super.updateStore(value)
	}
}

