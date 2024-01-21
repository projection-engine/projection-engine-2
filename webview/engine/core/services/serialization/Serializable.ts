import {
    SerializableAcceptedTypes,
    SerializableArray,
    SerializableClass,
    SerializationPackage
} from "@engine-core/engine-d"
import {v4} from 'uuid';

export default class Serializable {
    static __registeredSingletons: Map<string, GenericNonVoidFunction<Serializable>> = new Map()
    static sessionInstances: Record<string, Serializable> = {}
    static ID_PLACEHOLDER = "###SERIALIZABLE_ID###"
    #id = v4()

    getId() {
        return this.#id
    }

    collectDependencies(dependencies: Record<string, Serializable> = {}): Record<string, Serializable> {
        if (Object.hasOwn(dependencies, this.#id)) {
            return dependencies
        }
        dependencies[this.#id] = this
        for (const value of Object.values(this)) {
            this.#collect(value, dependencies);
        }
        return dependencies;
    }

    #collect(value: SerializableAcceptedTypes, dependencies: Record<string, Serializable> = {}) {
        if (value == null) {
            return;
        }

        if (value instanceof Serializable) {
            if (!Object.hasOwn(dependencies, value.getId())) {
                value.collectDependencies(dependencies)
            }
            return
        }

        if (Array.isArray(value)) {
            for (const v of value) {
                this.#collect(v, dependencies);
            }
        } else if (typeof value === "object") {
            for (const v of Object.values(value)) {
                this.#collect(v, dependencies);
            }
        }
    }

    stringify(): string {
        return JSON.stringify(this.serialize())
    }

    serialize(): SerializationPackage {
        const dependencies = this.collectDependencies()
        const serialized: Record<string, SerializableClass> = {}
        Object.entries(dependencies)
            .forEach(([key, value]) => {
                serialized[key] = {
                    className: value.constructor.name,
                    value: value.#serializeInternal(),
                    id: value.getId()
                }
            })
        return {root: this.#id, dependencies: serialized}
    }

    #serializeInternal(): string {
        return JSON.stringify(
            this,
            (key, value) => {
                if (key.startsWith("#") || key.startsWith("__"))
                    return
                if (typeof value === "object" && value !== null) {
                    if (value instanceof Serializable) {
                        return value === this ? value : value.getFixedID()
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

    getFixedID() {
        return Serializable.ID_PLACEHOLDER + this.#id + Serializable.ID_PLACEHOLDER
    }

    /**
     *
     * @throws Error
     * @param data
     */
    parse(data: string | SerializationPackage) {
        const json = (typeof data === "object" ? data : JSON.parse(data)) as SerializationPackage;
        const instances: Record<string, Serializable> = {}
        const rootType = json.dependencies[json.root].className;

        if (json.dependencies[json.root].className !== this.constructor.name) {
            throw new Error(`Incompatible types ${this.constructor.name} with ${rootType}`)
        }

        this.#id = json.root
        for (const [key, value] of Object.entries(json.dependencies)) {
            if (key === this.#id) {
                continue
            }
            instances[key] = Serializable.getInstanceFor(value)
            instances[key].#id = value.id
        }
        instances[json.root] = this

        try {
            for (const [key, value] of Object.entries(json.dependencies)) {
                instances[key].#load(value, instances)
            }
        } catch (ex) {
            console.error(ex)
            throw new Error("Error while parsing data: " + ex.message + "\n")
        }
    }

    #load(value: SerializableClass, instances: Record<string, Serializable>) {
        Object.entries(JSON.parse(value.value)).forEach(([key, value]) => {
            this[key] = this.#getValue(value as SerializableAcceptedTypes, instances)
        })
    }

    #getValue(value: SerializableAcceptedTypes, instances: Record<string, Serializable>) {
        if(value == null){
            return null;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                return (value as SerializableAcceptedTypes[]).map(e => this.#getValue(e, instances))
            } else if (Object.hasOwn(value, "type") && value.type === "object") {
                const cast = value.value as SerializableArray;
                if (cast.type === "f32") {
                    return new Float32Array(cast.array)
                }
                return new Uint8Array(cast.array)
            } else {
                const newObject = {}
                Object.entries(value)
                    .forEach(([key, e]) => {
                        newObject[key] = this.#getValue(e, instances)
                    })
                return newObject
            }
        } else {
            if (typeof value === "string" && value.includes(Serializable.ID_PLACEHOLDER)) {
                return instances[value.replaceAll(Serializable.ID_PLACEHOLDER, "")]
            }
            return value
        }
    }

    static getInstanceFor(value: SerializableClass) {
        if (!Serializable.__registeredSingletons.has(value.className)) {
            throw new Error(`No instance found for serializable class ${value.className}`)
        }
        if (Object.hasOwn(Serializable.sessionInstances, value.className)) {
            return Serializable.sessionInstances[value.className]
        }
        return Serializable.__registeredSingletons.get(value.className)();
    }
}