import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import SettingsStateDTO from "@lib/stores/state/SettingsStateDTO";

@Injectable
export default class SettingsStore extends AbstractStore<SettingsStateDTO>{
	constructor() {
		super(new SettingsStateDTO())
	}
}

