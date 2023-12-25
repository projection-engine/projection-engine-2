import WebViewPayload from "./WebViewPayload";

export default class WebViewSystem {
    private static listeners: Map<string, GenericVoidFunctionWithP<string>> = new Map()
    private static initialized = false

    private static addGlobalListener() {
        if (!WebViewSystem.initialized) {
            // @ts-ignore
            window.chrome.webview.addEventListener('message', event => {
                const response = WebViewPayload.of(event.data);
                if (this.listeners.has(response.id)) {
                    this.listeners.get(response.id)(response.payload)
                    this.listeners.delete(response.id)
                }
            })
            WebViewSystem.initialized = true
        }
    }

    static sendMessage(message: string, id: string) {
        WebViewSystem.addGlobalListener()
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    static sendMessageWithCallback(message: string, id: string, callback: GenericVoidFunctionWithP<string>) {
        WebViewSystem.addGlobalListener()
        WebViewSystem.listeners.set(id, callback)
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }
}