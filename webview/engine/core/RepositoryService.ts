import Serializable from "@engine-core/Serializable";
import {SerializableClass} from "@engine-core/engine-d";

export default class RepositoryService {
    static #instances: Map<string, GenericNonVoidFunction<Serializable>> = new Map()
    static #instanced: Map<string, Serializable> = new Map()


    static dump(): string {
        const result = {}
        for (let [key, value] of RepositoryService.#instanced.entries()) {
            result[key] = value.stringify()
        }
        return JSON.stringify(result)
    }

    static restore(data: string) {
        const record = JSON.parse(data) as Record<string, string>
        for (const [key, value] of Object.entries(record)) {
            if (!RepositoryService.#instanced.has(key)) {
                throw new Error("Singleton instance not found: " + key)
            }
            const instance = RepositoryService.#instanced.get(key);
            try {
                instance.parse(value)
            } catch (ex) {
                throw new Error("Some error occurred while parsing data: " + ex.message)
            }
        }
    }

    /**
     * @throws Error
     * @param data
     */
    static parseSerializable(data: string | SerializableClass): Serializable {
        const json = typeof data === "object" ? data : JSON.parse(data) as SerializableClass;
        if (!RepositoryService.#instances.has(json.className)) {
            console.log(RepositoryService.#instances)
            throw new Error(`No instance found for serializable class ${json.className}`)
        }
        const instance = RepositoryService.#instances.get(json.className)();
        instance.parse(data);
        return instance;
    }

    static injectable(Clazz: typeof Serializable) {
        if (RepositoryService.#instances.has(Clazz.name)) {
            return;
        }
        RepositoryService.#instances.set(Clazz.name, () => new Clazz())
        RepositoryService.#instanced.set(Clazz.name, new Clazz())
    }

    static serializable(Clazz: typeof Serializable) {
        if (RepositoryService.#instances.has(Clazz.name)) {
            return;
        }
        RepositoryService.#instances.set(Clazz.name, () => new Clazz())
    }

    /**
     * @throws Error Singleton not found
     * @param Clazz
     */
    static inject<T>(Clazz: new () => T): T {
        if (!RepositoryService.#instanced.has(Clazz.name)) {
            throw new Error(`Singleton not found ${Clazz.name}`)
        }
        return RepositoryService.#instanced.get(Clazz.name) as T;
    }

    static hasSingleton(name: string) {
        return RepositoryService.#instanced.has(name);
    }

}