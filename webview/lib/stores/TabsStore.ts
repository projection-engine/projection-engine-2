import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";

@Injectable
export default class TabsStore extends AbstractStore{
    constructor() {
        super({})
    }

}

