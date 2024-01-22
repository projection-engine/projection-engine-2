import Entity from "../instances/Entity"
import ProjectionEngine from "@lib/ProjectionEngine";

export default class EntityQueryService {
    static getEntityByQueryID(id: string): Entity | undefined {
        return ProjectionEngine.Engine.getQueryMap().get(id)
    }

    static getEntityByID(id: string): Entity | undefined {
        return ProjectionEngine.Engine.getEntities().get(id)
    }

    static getEntitiesWithNativeComponent(componentKey: string): Entity[] {
        const newArr = []
        for (let i = 0; i < ProjectionEngine.Engine.getEntities().array.length; i++) {
            const entity = ProjectionEngine.Engine.getEntities().array[i]
            if (entity.components.get(componentKey) != null)
                newArr.push(entity)
        }
        return newArr
    }

    static getClosestEntityParent(entity: Entity): Entity | undefined {
        let currentEntity = entity
        while (currentEntity?.parent) {
            currentEntity = currentEntity.parent
            if (!currentEntity.isCollection)
                return currentEntity
        }
    }

    static getClosestCollectionParent(entity: Entity): Entity | undefined {
        let currentEntity = entity
        while (currentEntity?.parent) {
            currentEntity = currentEntity.parent
            if (currentEntity.isCollection)
                return currentEntity
        }
    }

    static getEntityDepth(entity: Entity) {
        let depth = 0
        let currentEntity = entity
        while (currentEntity?.parent) {
            depth++
            currentEntity = currentEntity.parent
        }
        return depth
    }

    static isChildOf(entity: Entity, toFind: string): boolean {
        let currentEntity = entity
        while (currentEntity?.parent) {
            if (currentEntity.parent.id === toFind)
                return true
            currentEntity = currentEntity.parent
        }
        return false
    }

    static getHierarchyToObject(root: Entity, obj: MutableObject) {
        const children = root.children.array
        for (let i = 0; i < children.length; i++) {
            EntityQueryService.getHierarchyToObject(children[i], obj)
            obj[children[i].id] = children[i]
        }
    }

    static getHierarchy(root: Entity, array?: Entity[]): Entity[] {
        const hierarchy = array ?? []
        const children = root.children.array
        for (let i = 0; i < children.length; i++) {
            EntityQueryService.getHierarchy(children[i], hierarchy)
            hierarchy.push(children[i])
        }
        return hierarchy
    }

    static loopHierarchy(entity: Entity, callback: Function) {
        const children = entity.children.array
        callback(entity)
        for (let i = 0; i < children.length; i++) {
            const current = children[i]
            EntityQueryService.loopHierarchy(current, callback)
        }
    }

    static getEntityByPickerID(id: number): Entity | undefined {
        if (id === 0)
            return
        const entities = ProjectionEngine.Engine.getEntities().array
        const size = entities.length
        for (let i = 0; i < size; i++) {
            const current = entities[i]
            if (!current.active)
                continue
            if (current.pickIndex === id)
                return current
        }
    }
}