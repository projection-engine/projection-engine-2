import WebViewPayload from "@lib/webview/WebViewPayload";

export interface CommunicationService {
    addGlobalListener(): void;

    /**
     * Sends message to backend but doesn't wait for a response
     * @param message
     * @param id
     */
    beam(id: string, message?: string): void;

    /**
     * Same as "wire" method but a callback is required
     * @param message
     * @param id
     * @param callback
     */
    hardWire(id: string, callback: GenericVoidFunctionWithP<WebViewPayload>, message?: string): void;

    /**
     * Sends message and waits for a response with the same ID
     * @param message
     * @param id
     */
    wire(id: string, message?: string): Promise<WebViewPayload>;
}