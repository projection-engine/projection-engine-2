import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import EngineStateDTO from "@lib/stores/state/EngineStateDTO";


@Injectable
export default class EngineStore extends AbstractStore<EngineStateDTO> {
    constructor() {
        super(new EngineStateDTO())
    }
}



