import FilesAPI from "./FilesAPI";
import PROJECT_STATIC_DATA from "../../../../static/PROJECT_STATIC_DATA";
import NodeFS from "../../../shared/libs/NodeFS";
import PROJECT_FOLDER_STRUCTURE from "../../../../static/PROJECT_FOLDER_STRUCTURE";
import ConsoleAPI from "../../../../engine-core/lib/utils/ConsoleAPI";

export default class ErrorLoggerAPI {

    static get path() {
        return sessionStorage.getItem(PROJECT_STATIC_DATA.PROJECT_PATH) + NodeFS.sep + PROJECT_FOLDER_STRUCTURE.ERROR_FILE
    }

    static async save() {
        const p = ErrorLoggerAPI.path
        await FilesAPI.writeFile(p, JSON.stringify(ConsoleAPI.getErrorMessages()), true)
    }
}