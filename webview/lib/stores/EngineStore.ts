import AbstractStore from "./AbstractStore"
import ENGINE from "../../window/editor/static/ENGINE";
import {Injectable} from "@lib/ProjectionEngine";


@Injectable
export default class EngineStore extends AbstractStore{
	constructor() {
		super(ENGINE)
	}
}



