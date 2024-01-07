import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import VisualsStateDTO from "@lib/stores/state/VisualsStateDTO";

@Injectable
export default class VisualsStore extends AbstractStore<VisualsStateDTO>{
	constructor() {
		super(new VisualsStateDTO)
	}
}

