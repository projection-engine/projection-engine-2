import IInjectable from "@lib/IInjectable";
import {Inject, Injectable} from "@lib/Injection";
import WebViewService from "@lib/webview/WebViewService";
import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
import ItemDTO from "@lib/dto/fs/ItemDTO";
import FileDTO from "@lib/dto/fs/FileDTO";

@Injectable
export default class FSService extends IInjectable {
    static GET_PROJECT_PATH = "GET_PROJECT_PATH"
    static GET_ROOT_DIRECTORY = "GET_ROOT_DIRECTORY"
    static GET_SEPARATOR = "GET_SEPARATOR"
    static READ_DIRECTORY = "READ_DIRECTORY"

    @Inject(WebViewService)
    static webViewService: WebViewService

    __separator: string

    async getSeparator() {
        if (this.__separator == null) {
            return this.__separator = (await FSService.webViewService.wire(FSService.GET_SEPARATOR)).getPayload()
        }
        return this.__separator
    }

    async writeFile(path: string, content: string) {

    }

    async readFile(path: string): Promise<string> {
        return null
    }

    async readDirectory(path: string): Promise<ItemDTO[]> {
        const payload = await FSService.webViewService.wire(FSService.READ_DIRECTORY, path);
        if (payload.getPayload() != null) {
            const separator = await this.getSeparator()
            const paths = JSON.parse(payload.getPayload()) as string[];
            const DTOs: ItemDTO[] = []
            for (const currentItem of paths) {
                const name = currentItem.split(separator).pop();
                if (currentItem.includes(".")) {
                    const extension = currentItem.split(".").pop();
                    DTOs.push(new FileDTO(name, currentItem, extension))
                } else {
                    DTOs.push(new DirectoryDTO(name, currentItem))
                }
            }
            return DTOs;
        }
        return []
    }

    async delete(path: string) {

    }

    async getRootDirectory(): Promise<string> {
        const payload = await FSService.webViewService.wire(FSService.GET_ROOT_DIRECTORY);
        return payload.getPayload()
    }

    async requestCurrentFilePath() {
        const payload = await FSService.webViewService.wire(FSService.GET_PROJECT_PATH);
        return payload.getPayload()
    }

}