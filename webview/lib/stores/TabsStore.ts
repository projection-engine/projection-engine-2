import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/ProjectionEngine";

@Injectable
export default class TabsStore extends AbstractStore{
    constructor() {
        super({})
    }

}

