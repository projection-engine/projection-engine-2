export default class IStateDTO {
    #keys: string[] = null
    getKeys(): string[]{
        if(this.#keys == null){
            this.#keys = Object.keys(this)
        }
        return this.#keys
    }
}