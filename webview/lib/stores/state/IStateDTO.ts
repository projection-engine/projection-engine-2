import Serializable from "@engine-core/services/serialization/Serializable";

export default class IStateDTO extends Serializable{
    #keys: string[] = null

    getKeys(): string[]{
        if(this.#keys == null){
            this.#keys = Object.keys(this)
        }
        return this.#keys
    }
}