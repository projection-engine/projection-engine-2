import WebViewPayload from "./WebViewPayload";

export default class WebViewSystem {
    private static listeners: Map<string, GenericVoidFunctionWithP<WebViewPayload>> = new Map()
    private static initialized = false

    private static addGlobalListener() {
        if (!WebViewSystem.initialized) {
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
            WebViewSystem.initialized = true
        }
    }

    /**
     * Sends message to backend but doesn't wait for a response
     * @param message
     * @param id
     */
    static beam(message: string | null, id: string) {
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    /**
     * Same as "wire" method but a callback is required
     * @param message
     * @param id
     * @param callback
     */
    static hardWire(message: string | null, id: string, callback: GenericVoidFunctionWithP<WebViewPayload>) {
        WebViewSystem.addGlobalListener()
        WebViewSystem.listeners.set(id, callback)
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    /**
     * Sends message and waits for a response with the same ID
     * @param message
     * @param id
     */
    static async wire(message: string | null, id: string): Promise<WebViewPayload> {
        return new Promise(resolve => {
            WebViewSystem.hardWire(message, id, result => {
                resolve(result);
            });
        })
    }
}