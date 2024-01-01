import WebViewSystem from "../../shared/webview/WebViewSystem";
import EditorMessages from "./EditorMessages";
import StorageKeys from "../../../shared/enums/StorageKeys";
import FileSystemUtil from "../../shared/FileSystemUtil";
import LevelService from "../services/engine/LevelService";
import HotKeysController from "../../shared/lib/HotKeysController";
import ContentBrowserUtil from "../util/ContentBrowserUtil";

export default class EditorSystem {
    static async loadProject() {
        console.trace("LOADING PROJECT")
        const result = await WebViewSystem.wire(null, EditorMessages.LOAD_PROJECT)
        console.trace("PROJECT LOADED", result)
        try{
            const metadata = JSON.parse(result.getPayload());
            LevelService.initialize(metadata)
            HotKeysController.initializeListener()
            ContentBrowserUtil.initializeContentBrowser()
        }catch (ex){
            console.error(ex)
        }
    }
}