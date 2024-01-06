import Entity from "@engine-core/instances/Entity"

export default class EntityUpdateService {
    #listeners = new Map<string, { callback: Function, id: string }[]>()

    addListener(entityID: string, id: string, callback: Function) {
        const prev = this.#listeners.get(entityID) ?? []
        this.#listeners.set(entityID, [...prev, {callback, id}])
    }

    removeListener(entityID: string, id: string) {
        if (!entityID)
            return
        const prev = this.#listeners.get(entityID) ?? []
        this.#listeners.set(entityID, prev.filter(e => e.id !== id))
    }

    updateEntity(entity: Entity, value: any, ...keys: string[]) {
        let currentObject = entity
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i]
            currentObject = currentObject?.[key]
        }
        if (currentObject) {
            currentObject[keys[keys.length - 1]] = value
            const listeners = this.#listeners.get(entity.id) ?? []
            listeners.forEach(l => {
                l.callback?.(entity, value, keys)
            })
        }
    }
}