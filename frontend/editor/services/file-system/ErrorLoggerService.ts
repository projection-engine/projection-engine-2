import FSFilesService from "./FSFilesService"
import FileSystemUtil from "../../../shared/lib/FileSystemUtil"
import ConsoleAPI from "../../../../engine-core/lib/utils/ConsoleAPI"
import {STORAGE_KEYS} from "../../../shared/static/STORAGE_KEYS"
import Folders from "../../../../shared/Folders";

export default class ErrorLoggerService {

	static get path() {
		return sessionStorage.getItem(STORAGE_KEYS.PROJECT_PATH) + FileSystemUtil.sep + Folders.ERROR_FILE
	}

	static async save() {
		const p = ErrorLoggerService.path
		await FSFilesService.writeFile(p, JSON.stringify(ConsoleAPI.getErrorMessages()), true)
	}
}