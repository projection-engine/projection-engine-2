import DynamicMap from "@engine-core/lib/DynamicMap"
import IStateDTO from "@lib/stores/state/IStateDTO";
import * as crypto from "crypto";

export default class AbstractStore<T extends IStateDTO> {
    #data: T
    #globalSubs = new Map<string, GenericVoidFunctionWithP<T>>()
    #subsByField = new Map<string, Map<string, GenericVoidFunctionWithP<T>>>()

    constructor(data: T) {
        this.#data = data
    }

    updateStore(data: MutableObject = {}) {
        const callbacks: GenericVoidFunctionWithP<T>[] = []
        for (const key of this.#data.getKeys()) {
            if (!Object.hasOwn(data, key)) {
                continue;
            }
            const dataValue = data[key];
            if (dataValue !== this.#data[key] && this.#subsByField.has(key)) {
                this.#subsByField
                    .get(key)
                    .forEach(c => callbacks.push(c))
            }
            this.#data[key] = dataValue
        }
        this.#globalSubs.forEach(callback => callbacks.push(callback))
        callbacks.forEach(c => c(this.#data))
    }

    /**
     * Callback is triggered when state changes
     * @param callback
     * @param dependencies
     * @return unsubscribe callback
     */
    subscribe(callback: GenericVoidFunctionWithP<T>, dependencies: string[] = []): GenericVoidFunction {
        callback(this.#data)
        const id = crypto.randomUUID()
        if (dependencies.length === 0) {
            this.#globalSubs.set(id, callback)
            return () => {
                this.#globalSubs.delete(id)
            }
        } else {
            dependencies.forEach(d => {
                if (!this.#subsByField.has(d)) {
                    this.#subsByField.set(d, new Map())
                }
                this.#subsByField.get(d).set(id, callback)
            })
            return () => {
                dependencies.forEach(d => {
                    const map = this.#subsByField.get(d);
                    map.delete(id)
                    if (map.size === 0) {
                        this.#subsByField.delete(d)
                    }
                })
            }
        }
    }

    addListener(id: string, callback: Function, dependencies = []) {
        // if (this.#listeners.has(id))
        //     return
        // this.#listeners.set(id, {callback, dependencies})
        // callback(this.#data)
    }

    removeListener(id: string) {
        // this.#listeners.delete(id)
    }

    getData(): T {
        return this.#data
    }
}