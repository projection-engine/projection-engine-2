import {
    SerializableAcceptedTypes,
    SerializableArray,
    SerializableClass,
    SerializableValue
} from "@engine-core/engine-d";
import RepositoryService from "@engine-core/RepositoryService";

export default class Serializable {
    stringify(): string {
        const visited = new WeakSet()
        return JSON.stringify({className: this.constructor.name, value: this.#serializeInternal(visited)})
    }

    #serializeInternal(visited: WeakSet<Object>): string {
        return JSON.stringify(
            this,
            (key, value) => {
                if (key.startsWith("#") || key.startsWith("__"))
                    return
                if (typeof value === "object" && value !== null) {
                    if (value === this) {
                        visited.add(value)
                        return value
                    }

                    if (visited.has(value)) {
                        return
                    }

                    if (value instanceof Serializable && !RepositoryService.hasSingleton(value.constructor.name)) {
                        return {
                            type: "serializable",
                            value: {className: value.constructor.name, value: value.#serializeInternal(visited)}
                        }
                    }

                    if (value instanceof Int8Array ||
                        value instanceof Uint8Array ||
                        value instanceof Uint8ClampedArray ||
                        value instanceof Int16Array ||
                        value instanceof Uint16Array ||
                        value instanceof Int32Array ||
                        value instanceof Uint32Array ||
                        value instanceof Float32Array ||
                        value instanceof Float64Array) {
                        const obj = {
                            array: Array.from(value),
                            type: value instanceof Float32Array ? "f32" : "ui8"
                        } as SerializableArray
                        return {type: "object", value: obj}
                    }
                    if (Object.getPrototypeOf(value) === Object.prototype || Array.isArray(value)) {
                        return value
                    }
                    return
                }
                return value
            })
    }

    /**
     *
     * @throws Error
     * @param data
     */
    parse(data: string | SerializableClass) {
        const json = typeof data === "object" ? data : JSON.parse(data) as SerializableClass;
        if (this.constructor.name !== json.className) {
            throw new Error(`Not compatible types: ${this.constructor.name} is not compatible with ${json.className}`)
        }
        try {
            const entries = Object.entries(JSON.parse(json.value) as SerializableValue)
            for (const [key, value] of entries) {
                this[key] = this.#parseInternal(value as SerializableAcceptedTypes);
            }
        } catch (ex) {
            console.error(ex)
            throw new Error("Error while parsing data: " + ex.message + "\n")
        }
    }

    #parseInternal(value: SerializableAcceptedTypes) {
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                return (value as SerializableAcceptedTypes[]).map(e => this.#parseInternal(e))
            } else if (Object.hasOwn(value, "type")) {
                if (value.type === "object") {
                    const cast = value.value as SerializableArray;
                    if (cast.type === "f32") {
                        return new Float32Array(cast.array)
                    } else {
                        return new Uint8Array(cast.array)
                    }
                } else if (value.type === "serializable") {
                    return RepositoryService.parseSerializable(value.value as SerializableClass)
                }
            } else {
                return value
            }
        } else {
            return value
        }
    }
}