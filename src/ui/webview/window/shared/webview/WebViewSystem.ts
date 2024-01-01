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

    static sendMessage(message: string | null, id: string) {
        WebViewSystem.addGlobalListener()
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }

    static sendMessageWithCallback(message: string | null, id: string, callback: GenericVoidFunctionWithP<WebViewPayload>) {
        WebViewSystem.addGlobalListener()
        WebViewSystem.listeners.set(id, callback)
        // @ts-ignore
        window.chrome.webview.postMessage(JSON.stringify(new WebViewPayload(id, message)))
    }
}