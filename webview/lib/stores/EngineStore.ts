import AbstractStore from "./AbstractStore"
import ENGINE from "../../window/editor/static/ENGINE";
import {Injectable} from "@lib/Injection";


@Injectable
export default class EngineStore extends AbstractStore{
	constructor() {
		super(ENGINE)
	}
}



