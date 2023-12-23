export default class WebViewSystem {
    private static listeners: { [key: string]: GenericVoidFunctionWithP<{data: string}> } = {}

    static sendMessage(message: string) {
        // @ts-ignore
        window.chrome.webview.postMessage(message)
    }

    static addMessageListener(id: string, callback: GenericVoidFunctionWithP<string>) {
        WebViewSystem.listeners[id] = event => callback(event.data)
        // @ts-ignore
        window.chrome.webview.addEventListener('message', WebViewSystem.listeners[id])
    }

    static removeMessageListener(id: string) {
        // @ts-ignore
        window.chrome.webview.removeEventListener('message', WebViewSystem.listeners[id])
    }
}