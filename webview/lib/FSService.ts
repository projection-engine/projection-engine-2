import IInjectable from "@lib/IInjectable";
import {Inject, Injectable} from "@lib/Injection";
import WebViewService from "@lib/webview/WebViewService";

@Injectable
export default class FSService extends IInjectable {
    static GET_PROJECT_PATH = "GET_PROJECT_PATH"

    @Inject(WebViewService)
    static webViewService: WebViewService

    writeFile(path: string, content: string) {

    }

    readFile(path: string): string {
        return null
    }

    readDir(path: string): string[] {
        return []
    }

    delete(path: string) {

    }

    async requestCurrentFilePath() {
        const payload = await FSService.webViewService.wire(FSService.GET_PROJECT_PATH);
        return payload.getPayload()
    }

}