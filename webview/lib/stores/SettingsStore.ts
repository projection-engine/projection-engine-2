import AbstractStore from "./AbstractStore"
import {Injectable} from "@lib/Injection";
import SettingsStateDTO from "@lib/stores/state/SettingsStateDTO";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import SelectionStore from "@lib/stores/SelectionStore";

@Injectable
export default class SettingsStore extends AbstractStore<SettingsStateDTO>{
	constructor() {
		super(new SettingsStateDTO())
	}
}

RepositoryService.serializable(SettingsStore)
