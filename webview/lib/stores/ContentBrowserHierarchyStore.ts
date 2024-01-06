import AbstractStore from "./AbstractStore"
import ContentBrowserUtil from "../../window/editor/util/ContentBrowserUtil";
import {Injectable} from "@lib/ProjectionEngine";

@Injectable
export default class ContentBrowserHierarchyStore extends AbstractStore{
	constructor() {
		super({items: [], open: {}})
	}

	updateStore(value={}) {
		super.updateStore({...value, items: ContentBrowserUtil.updateHierarchy()})
	}



}

