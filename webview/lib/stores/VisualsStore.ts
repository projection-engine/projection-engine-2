import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
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

