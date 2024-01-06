import AbstractStore from "./AbstractStore"
import ENGINE from "../../window/editor/static/ENGINE";


export default class EngineStore extends AbstractStore{
	constructor() {
		super(ENGINE)
	}
}



