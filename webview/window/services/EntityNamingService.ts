import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import Entity from "@engine-core/instances/Entity"
import ProjectionEngine from "@lib/ProjectionEngine";

export default class EntityNamingService {
    #byName = new Map<string, string>()
    get byName() {
        return this.#byName
    }

    clear() {
        this.#byName.clear()
    }

    set byName(data: Map<string, string>) {
        if (data instanceof Map)
            this.#byName = data
    }

    renameEntity(newName: string, entity: Entity) {
        const found = this.#byName.get(newName)
        let validName = true
        if (found !== entity.id)
            validName = !QueryAPI.getEntityByID(found)
        if (validName) {
            ProjectionEngine.EntityUpdateService.updateEntity(entity, newName, "name")
            this.#byName.set(newName, entity.id)
        } else {
            {
                const subWord = ".00"
                const originalPrefix = subWord + newName.split(subWord).pop()
                let currentIndex = parseInt(newName.split(subWord).pop())
                if (isNaN(currentIndex))
                    currentIndex = 1
                else
                    currentIndex += 1
                this.renameEntity(newName.replace(originalPrefix, "") + subWord + currentIndex, entity)
            }
        }
    }

    renameInBlock(entities: Entity[]) {
        const groupID = crypto.randomUUID().substring(0, 3)
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            if (this.#byName.has(entity.name))
                entity.name = entity.name + "." + i.toString().padStart(3, "0") + "(" + groupID + ")"
            this.#byName.set(entity.name, entity.id)
        }
    }
}