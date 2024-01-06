import ArrayBufferAPI from "./utils/ArrayBufferAPI"

export default class CameraNotificationDecoder {
    #buffer: Float32Array
    #initialized = false

    get ORTHOGRAPHIC() {
        return 1
    }

    get PERSPECTIVE() {
        return 0
    }

    generateBuffer() {
        const b = <Float32Array>ArrayBufferAPI.allocateVector(7, 0)
        b[0] = 1
        b[1] = 1
        b[2] = 0

        b[3] = 0
        b[4] = 0

        b[5] = .001
        b[6] = 0
        return b
    }

    initialize(buffer: Float32Array) {
        if (this.#initialized)
            return
        this.#initialized = true
        this.#buffer = buffer
    }

    get viewNeedsUpdate() {
        return this.#buffer[0]
    }

    get projectionNeedsUpdate() {
        return this.#buffer[1]
    }

    get projectionType() {
        return this.#buffer[2]
    }

    get hasChangedView() {
        return this.#buffer[3]
    }

    get hasChangedProjection() {
        return this.#buffer[4]
    }

    get translationSmoothing() {
        return this.#buffer[5]
    }

    get elapsed() {
        return this.#buffer[6]
    }

    set viewNeedsUpdate(data) {
        this.#buffer[0] = data
    }

    set projectionNeedsUpdate(data) {
        this.#buffer[1] = data
    }

    set projectionType(data) {
        this.#buffer[2] = data
    }

    set hasChangedView(data) {
        this.#buffer[3] = data
    }

    set hasChangedProjection(data) {
        this.#buffer[4] = data
    }

    set translationSmoothing(data) {
        this.#buffer[5] = data
    }

    set elapsed(data) {
        this.#buffer[6] = data
    }
}