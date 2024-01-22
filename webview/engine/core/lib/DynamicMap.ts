import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Serializable from "@engine-core/services/serialization/Serializable";

export default class DynamicMap<T> extends Serializable {
    array: T[] = []
    map: Record<string, T> = {}

    set(key: string, value: T): this {
        if (this.has(key))
            return
        this.map[key] = value
        this.array.push(value)
        return this
    }

    clear() {
        for (let key in this.map) {
            delete this.map[key];
        }
        this.array.length = 0
    }

    get(key: string){
        return this.map[key]
    }

    delete(key: string): boolean {
        const found = this.get(key)
        if (found === undefined)
            return false
        delete this.map[key];
        this.array.splice(this.array.indexOf(found), 1)
        return true
    }

    removeBlock(resources: T[], getIDCallback: GenericNonVoidFunctionWithP<T, string>) {
        const toRemoveMap = {}
        for (let i = 0; i < resources.length; i++) {
            toRemoveMap[getIDCallback(resources[i])] = 1
        }

        for (let i = 0; i < this.array.length; i++) {
            const ID = getIDCallback(this.array[i])
            if (toRemoveMap[ID] === 1) {
                delete this.map[ID];
                this.array[i] = undefined
            }
        }
        this.array = this.array.filter(e => e !== undefined)
    }

    keys(): string[]{
        return Object.keys(this.map)
    }

    forEach(cb: GenericVoidFunctionWith3P<T, number, T[]>){
        const size = this.array.length
        for(let i = 0; i < size; i++){
            cb(this.array[i], i, this.array)
        }
    }

    addBlock(resources: T[], getIDCallback: GenericNonVoidFunctionWithP<T, string>) {
        this.array.push(...resources)
        for (let i = 0; i < resources.length; i++) {
            const current = resources[i]
            this.map[getIDCallback(current)] = current
        }
    }

    has(key: string) {
        return Object.hasOwn(this.map, key)
    }

}

RepositoryService.serializable(DynamicMap)