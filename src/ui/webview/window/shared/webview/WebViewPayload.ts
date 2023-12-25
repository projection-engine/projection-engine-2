export default class WebViewPayload {
    private readonly payload: string
    private readonly id: string

    constructor(id: string, payload: string) {
        this.payload = payload;
        this.id = id;
    }

    static of(data: string): WebViewPayload {
        const res = JSON.parse(data);
        return new WebViewPayload(res.id, res.payload)
    }
}