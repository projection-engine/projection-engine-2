import IInjectable from "@lib/IInjectable";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

function Inject(Clazz: any) {
    return (target: any, propertyKey: string) => {
        Injectable(Clazz)
        target[propertyKey] = RepositoryService.inject(Clazz)
    }
}

function LazyInject(Clazz: any) {
    return (target: any, key: string) => {
        Object.defineProperty(target, key, {
            get() {
                return RepositoryService.inject(Clazz)
            },
            enumerable: true,
            configurable: true,
        });
    }
}

function Injectable(Clazz: typeof IInjectable) {
    RepositoryService.injectable(Clazz)
}

const InjectVar = RepositoryService.inject


export {Injectable, Inject, InjectVar, LazyInject}

