import WebViewPayload from "./WebViewPayload";
import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import {CommunicationService} from "@lib/webview/CommunicationService";

@Injectable
export default class WebViewService extends IInjectable implements CommunicationService {
    private listeners: Map<string, GenericVoidFunctionWithP<WebViewPayload>> = new Map()
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
                        this.listeners.get(response.getId())(response)
                        this.listeners.delete(response.getId())
                    }
                } catch (ex) {
                    console.error(ex)
                }
            })
            this.initialized = true
        }
    }

    /**
     * Sends message to backend but doesn't wait for a response
     * @param message
     * @param id
     */
    beam(id: string, message?: string) {
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    /**
     * Same as "wire" method but a callback is required
     * @param message
     * @param id
     * @param callback
     */
    hardWire(id: string, callback: GenericVoidFunctionWithP<WebViewPayload>, message?: string) {
        this.addGlobalListener()
        this.listeners.set(id, callback)
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    /**
     * Sends message and waits for a response with the same ID
     * @param message
     * @param id
     */
    async wire(id: string, message?: string): Promise<WebViewPayload> {
        return new Promise(resolve => this.hardWire(id, resolve, message))
    }
}