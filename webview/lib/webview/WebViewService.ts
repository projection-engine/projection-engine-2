import WebViewPayload from "./WebViewPayload";
import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import {CommunicationService} from "@lib/webview/CommunicationService";

@Injectable
export default class WebViewService extends IInjectable implements CommunicationService {
    private listeners: Map<string, GenericVoidFunctionWithP<WebViewPayload>[]> = new Map()
    private fixedListeners: Map<string, GenericVoidFunctionWithP<WebViewPayload>[]> = new Map()
    private initialized = false

    addGlobalListener() {
        if (!this.initialized) {
            // @ts-ignore
            window.chrome.webview.addEventListener('message', event => {
                try {
                    if (event.data == null) {
                        return
                    }
                    const response = WebViewPayload.of(event.data);
                    if (this.listeners.has(response.getId())) {
                        this.listeners.get(response.getId()).forEach(c => c(response))
                        this.listeners.delete(response.getId())
                    }

                    if (this.fixedListeners.has(response.getId())) {
                        this.fixedListeners.get(response.getId()).forEach(c => c(response))
                    }
                } catch (ex) {
                    console.error(ex)
                }
            })
            this.initialized = true
        }
    }

    beam(id: string, message?: string) {
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    hardWire(id: string, callback: GenericVoidFunctionWithP<WebViewPayload>, message?: string) {
        this.addGlobalListener()

        if (!this.listeners.has(id)) {
            this.listeners.set(id, [])
        }
        this.listeners.get(id).push(callback);
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    listen(id: string, callback: GenericVoidFunctionWithP<WebViewPayload>): VoidFunction {
        if (!this.fixedListeners.has(id)) {
            this.fixedListeners.set(id, [])
        }
        this.fixedListeners.get(id).push(callback);
        return () => this.fixedListeners.set(id, this.fixedListeners.get(id).filter(c => c != callback));
    }

    async wire(id: string, message?: string): Promise<WebViewPayload> {
        return new Promise(resolve => this.hardWire(id, resolve, message))
    }
}