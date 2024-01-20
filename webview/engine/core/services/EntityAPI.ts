import COMPONENTS from "../static/COMPONENTS"
import GUIService from "./GUIService"
import PhysicsAPI from "./PhysicsAPI"
import Entity from "../instances/Entity"
import ENTITY_TYPED_ATTRIBUTES from "../static/ENTITY_TYPED_ATTRIBUTES"
import LightsService from "./LightsService"
import DepthPrePassSystem from "../runtime/DepthPrePassSystem"
import ResourceEntityMapper from "../repositories/ResourceEntityMapper"
import MeshResourceMapper from "../repositories/MeshResourceMapper"
import MaterialResourceMapper from "../repositories/MaterialResourceMapper"
import QueryAPI from "./QueryAPI"
import ProjectionEngine from "@lib/ProjectionEngine";

const COMPONENT_TRIGGER_UPDATE = [COMPONENTS.LIGHT, COMPONENTS.MESH]
const excludedKeys = [
    ...ENTITY_TYPED_ATTRIBUTES,
    "components",
    "parent",
    "matrix",
    "_props",
    "isCollection",
    "id"
]
export default class EntityAPI {
    static getNewEntityInstance(id?: string, isCollection?: boolean): Entity {
        return new Entity(id, isCollection)
    }

    static isRegistered(entity) {
        return ProjectionEngine.Engine.entities.has(entity.id)
    }

    static addGroup(entities: Entity[]) {
        const levelEntity = ProjectionEngine.Engine.getRootEntity()
        if (!levelEntity)
            return
        const map = {}
        const size = entities.length
        for (let i = 0; i < size; i++) {
            const entity = entities[i]
            map[entity.id] = entity
        }
        for (let i = 0; i < size; i++) {
            const entity = entities[i]
            if (entity === levelEntity)
                continue
            if (!entity.parentID || entity.parentID === levelEntity.id)
                entity.addParent(levelEntity)
            else if (!entity.parent && entity.parentID) {
                if (ProjectionEngine.Engine.entities.has(entity.parentID))
                    entity.addParent(ProjectionEngine.Engine.entities.get(entity.parentID))
                else
                    entity.addParent(map[entity.parentID])
            }
            entity.parentID = undefined
        }
        ProjectionEngine.Engine.entities.addBlock(entities, e => e.id)
        // TransformationSystem.registerBlock(entities)
        ResourceEntityMapper.addBlock(entities)
    }

    static addEntity(entity?: Entity): Entity {
        if (!entity)
            return
        if (entity && ProjectionEngine.Engine.entities.has(entity.id))
            return ProjectionEngine.Engine.entities.get(entity.id)
        const target = entity ?? EntityAPI.getNewEntityInstance()
        if (!entity.parent && !entity.parentID)
            entity.addParent(ProjectionEngine.Engine.getRootEntity())
        ProjectionEngine.Engine.entities.set(target.id, target)
        EntityAPI.registerEntityComponents(target)
        return entity
    }

    static toggleVisibility(entity: Entity): void {
        const newValue = !entity.active
        entity.active = newValue
        let needsLightUpdate = entity.meshComponent !== undefined || entity.lightComponent !== undefined
        let needsVisibilityUpdate = entity.meshComponent !== undefined
        const hierarchy = QueryAPI.getHierarchy(entity)
        hierarchy.forEach(child => {
            child.active = newValue
            needsVisibilityUpdate = needsVisibilityUpdate || child.meshComponent !== undefined
            needsLightUpdate = needsLightUpdate || child.meshComponent !== undefined || child.lightComponent !== undefined
        })

        if (needsLightUpdate)
            LightsService.packageLights(false, true)
        DepthPrePassSystem.needsUpdate = needsVisibilityUpdate
    }

    static registerEntityComponents(entity: Entity, previouslyRemoved?: string): void {
        if (!EntityAPI.isRegistered(entity))
            return

        ProjectionEngine.Engine.queryMap.set(entity.queryKey, entity)
        ResourceEntityMapper.addEntity(entity)
        if (COMPONENT_TRIGGER_UPDATE.indexOf(<COMPONENTS | undefined>previouslyRemoved) || !!COMPONENT_TRIGGER_UPDATE.find(v => entity.components.get(v) != null))
            LightsService.packageLights(false, true)
        DepthPrePassSystem.needsUpdate = true
    }

    static removeEntity(entityToRemove: string | Entity) {
        const entity = entityToRemove instanceof Entity ? entityToRemove : ProjectionEngine.Engine.entities.get(entityToRemove)
        if (!entity || entity === ProjectionEngine.Engine.getRootEntity())
            return
        entity.removeParent()
        EntityAPI.removeGroup([entity], true)
    }

    static removeGroup(toRemove: Entity[], searchHierarchy: boolean) {
        const hierarchy: { [key: string]: Entity } = {}
        for (let i = 0; i < toRemove.length; i++) {
            const entity = toRemove[i]
            if (entity !== ProjectionEngine.Engine.getRootEntity())
                hierarchy[entity.id] = entity
            if (searchHierarchy)
                QueryAPI.getHierarchyToObject(entity, hierarchy)
        }
        const entities = Object.values(hierarchy)
        ProjectionEngine.Engine.entities.removeBlock(entities, entity => entity.id)
        MeshResourceMapper.removeBlock(entities)
        MaterialResourceMapper.removeBlock(entities)
        ResourceEntityMapper.removeBlock(entities)

        let didLightsChange
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            if (entity === ProjectionEngine.Engine.getRootEntity())
                continue

            if (entity.parent && !hierarchy[entity.parent.id])
                entity.removeParent()
            if (!ProjectionEngine.Engine.isDev)
                for (let i = 0; i < entity.scripts.length; i++) {
                    const scr = entity.scripts[i]
                    if (scr && scr.onDestruction)
                        scr.onDestruction()
                }
            ProjectionEngine.Engine.queryMap.delete(entity.queryKey)
            PhysicsAPI.removeRigidBody(entity)
            GUIService.deleteUIEntity(entity)
            if (entity.lightComponent !== undefined || entity.meshComponent !== undefined)
                didLightsChange = true
        }

        if (didLightsChange)
            LightsService.packageLights(false, true)
    }

    static parseEntityObject(entity: MutableObject, asNew?: boolean): Entity {
        const parsedEntity = EntityAPI.getNewEntityInstance(asNew ? crypto.randomUUID() : entity.id, entity.isCollection)

        const keys = Object.keys(entity)

        for (let i = 0; i < keys.length; i++) {
            try {
                const k = keys[i]
                if (!excludedKeys.includes(k))
                    parsedEntity[k] = entity[k]
            } catch (err) {
                console.error(err)
            }
        }

        for (let i = 0; i < ENTITY_TYPED_ATTRIBUTES.length; i++) {
            try {
                const key = ENTITY_TYPED_ATTRIBUTES[i]
                if (!entity[key])
                    continue
                for (let j = 0; j < parsedEntity[key].length; j++)
                    parsedEntity[key][j] = entity[key][j]
            } catch (err) {
                console.error(err)
            }
        }

        parsedEntity.parentID = entity.parent ?? ProjectionEngine.Engine.getRootEntity()?.id

        for (const k in entity.components) {
            const component = parsedEntity.addComponent(k)
            if (!component)
                continue
            const keys = Object.keys(entity.components[k])
            for (let i = 0; i < keys.length; i++) {
                try {
                    const componentValue = keys[i]
                    if (componentValue.includes("__") || componentValue.includes("#") || componentValue === "_props" || componentValue === "_name")
                        continue
                    switch (k) {
                        case COMPONENTS.MESH: {
                            if (componentValue === "_meshID" || componentValue === "_materialID")
                                component[componentValue.replace("_", "")] = entity.components[k][componentValue]
                            else
                                component[componentValue] = entity.components[k][componentValue]
                            break
                        }
                        case COMPONENTS.ATMOSPHERE:
                        case COMPONENTS.DECAL: {
                            if (componentValue.charAt(0) === "_")
                                component[componentValue.substring(1, componentValue.length)] = entity.components[k][componentValue]
                            else
                                component[componentValue] = entity.components[k][componentValue]
                            break
                        }
                        default:
                            component[componentValue] = entity.components[k][componentValue]
                    }


                } catch (err) {
                    console.error(err)
                }
            }
        }
        parsedEntity.changed = true
        parsedEntity.name = entity.name
        parsedEntity.active = entity.active
        return parsedEntity
    }
}
