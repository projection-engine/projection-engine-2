import Serializable from "./Serializable";
import {SerializableClass} from "@engine-core/engine-d";
import Repository from "./Repository";

export default class RepositoryService {
    static #repository: Repository

    static get(): Repository {
        if (RepositoryService.#repository == null) {
            Serializable.__registeredSingletons.set(Repository.name, () => new Repository())
            RepositoryService.#repository = new Repository()
        }
        return RepositoryService.#repository
    }

    static dump(): string {
        return RepositoryService.get().stringify()
    }

    static restore(data: string) {
        RepositoryService.get().parse(data)
    }

    static injectable(Clazz: typeof Serializable) {
        if (Serializable.__registeredSingletons.has(Clazz.name)) {
            return;
        }
        Serializable.__registeredSingletons.set(Clazz.name, () => new Clazz())
        Serializable.sessionInstances[Clazz.name] = RepositoryService.get().instanced[Clazz.name] = new Clazz()
    }

    static serializable(Clazz: typeof Serializable) {
        if (Serializable.__registeredSingletons.has(Clazz.name)) {
            return;
        }
        Serializable.__registeredSingletons.set(Clazz.name, () => new Clazz())
    }

    /**
     * @throws Error Singleton not found
     * @param Clazz
     */
    static inject<T>(Clazz: new () => T): T {
        if (!RepositoryService.hasSingleton(Clazz.name)) {
            throw new Error(`Singleton not found ${Clazz.name}`)
        }
        return RepositoryService.get().instanced[Clazz.name] as T;
    }

    static hasSingleton(name: string) {
        return Object.hasOwn(RepositoryService.get().instanced, name);
    }

    static getInstanceFor(value: SerializableClass) {
        return Serializable.getInstanceFor(value)
    }
}