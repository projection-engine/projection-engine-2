import DynamicMap from "@engine-core/lib/DynamicMap"
import IStateDTO from "@lib/stores/state/IStateDTO";
import * as crypto from "crypto";

export default class AbstractStore<T extends IStateDTO> {
    #data: T
    #globalSubscriptions = new Map<string, GenericVoidFunctionWithP<T>>()
    #subscriptionsByDependencyKey = new Map<string, Map<string, GenericVoidFunctionWithP<T>>>()

    constructor(data: T) {
        this.#data = data
    }

    updateStore(data: MutableObject = {}) {
        const callbacks: GenericVoidFunctionWithP<T>[] = []

        this.#data
            .getKeys()
            .forEach(key => {
                if (data[key] !== undefined && data[key] !== this.#data[key]) {
                    this.#subscriptionsByDependencyKey
                        .get(key)
                        .forEach(callback => {
                            callbacks.push(callback)
                        })
                }
            })
        this.#globalSubscriptions
            .forEach(callback => callbacks.push(callback))
        Object.assign(this.#data, data)
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
            this.#globalSubscriptions.set(id, callback)
            return () => {
                this.#globalSubscriptions.delete(id)
            }
        } else {
            dependencies.forEach(d => {
                if (!this.#subscriptionsByDependencyKey.has(d)) {
                    this.#subscriptionsByDependencyKey.set(d, new Map())
                }
                this.#subscriptionsByDependencyKey.get(d).set(id, callback)
            })
            return () => {
                dependencies.forEach(d => {
                    const map = this.#subscriptionsByDependencyKey.get(d);
                    map.delete(id)
                    if (map.size === 0) {
                        this.#subscriptionsByDependencyKey.delete(d)
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