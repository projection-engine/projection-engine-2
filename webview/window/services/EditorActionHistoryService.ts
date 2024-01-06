import UndoRedo from "../editor/components/UndoRedo"
import EntityAPI from "@engine-core/lib/utils/EntityAPI"


import serializeStructure from "@engine-core/utils/serialize-structure"
import EngineStateService from "./EngineStateService"
import Entity from "@engine-core/instances/Entity"
import LocalizationEN from "@enums/LocalizationEN"
import ProjectionEngine from "@lib/ProjectionEngine";

interface Action {
    nameCache: Map<string, string>
    toRemove: string[]
    toAdd: string | undefined
}

export default class EditorActionHistoryService {
    #cache = new UndoRedo<Action>()

    clear() {
        this.#cache.index = 0
        this.#cache.history = [null]
    }

    save(value: Entity[] | Entity, isRemoval?: boolean) {
        ProjectionEngine.ChangesTrackerStore.updateStore({changed: true})

        const data = (Array.isArray(value) ? value.map(v => v?.serializable?.()) : [value.serializable()]).filter(e => e !== undefined)
        this.#cache.save({
            nameCache: new Map(ProjectionEngine.EntityNamingService.byName),
            toRemove: data.map(d => d.id),
            toAdd: !isRemoval ? serializeStructure(data) : undefined
        })
    }

    undo() {
        const action = this.#cache.undo()
        if (action) {
            ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.UNDOING_CHANGES)
            this.#apply(action)
        } else
            ProjectionEngine.ChangesTrackerStore.updateStore({changed: true})
    }

    redo() {
        const action = this.#cache.redo()
        if (action) {
            ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.REDOING_CHANGES)
            this.#apply(action)
        }
    }

    #apply(currentAction: Action) {
        const nameCache = currentAction.nameCache
        const toRemove = currentAction.toRemove
        const toAdd: Entity[] = []
        const parsedToAdd = currentAction.toAdd ? JSON.parse(currentAction.toAdd) : []

        ProjectionEngine.EntityNamingService.byName = nameCache
        for (let i = 0; i < parsedToAdd.length; i++) {
            if (!parsedToAdd[i])
                continue
            toAdd.push(EntityAPI.parseEntityObject(parsedToAdd[i]))
        }
        EngineStateService.replaceBlock(toRemove, toAdd)

    }
}

