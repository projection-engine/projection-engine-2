import COMPONENTS from "../static/Components"
import GUIService from "./GUIService"
import PhysicsWorld from "../core/PhysicsWorld"
import Entity from "../instances/Entity"
import LightsService from "./LightsService"
import DepthPrePassSystem from "../runtime/DepthPrePassSystem"
import MeshRepository from "../repositories/MeshRepository"
import MaterialRepository from "../repositories/MaterialRepository"
import EntityQueryService from "./EntityQueryService"
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";

const COMPONENT_TRIGGER_UPDATE = [COMPONENTS.LIGHT, COMPONENTS.MESH]
export default class EntityAPI extends AbstractEngineSystem{
    static getNewEntityInstance(id?: string, isCollection?: boolean): Entity {
        return new Entity(id, isCollection)
    }

    static isRegistered(entity: Entity) {
        return ProjectionEngine.Engine.getEntities().has(entity.id)
    }

    static addGroup(entities: Entity[]) {
        const entitiesMap = ProjectionEngine.Engine.getEntities();
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
                if (entitiesMap.has(entity.parentID))
                    entity.addParent(entitiesMap.get(entity.parentID))
                else
                    entity.addParent(map[entity.parentID])
            }
            entity.parentID = undefined
        }
        entitiesMap.addBlock(entities, e => e.id)
        // TransformationSystem.registerBlock(entities)
        ProjectionEngine.Engine.getWorld().addBlock(entities)
    }

    static addEntity(entity?: Entity): Entity {
        const entitiesMap = ProjectionEngine.Engine.getEntities();
        if (!entity)
            return
        if (entity && entitiesMap.has(entity.id))
            return entitiesMap.get(entity.id)
        const target = entity ?? EntityAPI.getNewEntityInstance()
        if (!entity.parent && !entity.parentID)
            entity.addParent(ProjectionEngine.Engine.getRootEntity())
        entitiesMap.set(target.id, target)
        EntityAPI.registerEntityComponents(target)
        return entity
    }

    static toggleVisibility(entity: Entity): void {
        const newValue = !entity.active
        entity.active = newValue
        let needsLightUpdate = entity.meshComponent !== undefined || entity.lightComponent !== undefined
        let needsVisibilityUpdate = entity.meshComponent !== undefined
        const hierarchy = EntityQueryService.getHierarchy(entity)
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

        ProjectionEngine.Engine.getWorld().addEntity(entity)
        if (COMPONENT_TRIGGER_UPDATE.indexOf(<COMPONENTS | undefined>previouslyRemoved) || !!COMPONENT_TRIGGER_UPDATE.find(v => entity.components.get(v) != null))
            LightsService.packageLights(false, true)
        DepthPrePassSystem.needsUpdate = true
    }

    static removeEntity(entityToRemove: string | Entity) {
        const entity = entityToRemove instanceof Entity ? entityToRemove : ProjectionEngine.Engine.getEntities().get(entityToRemove)
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
                EntityQueryService.getHierarchyToObject(entity, hierarchy)
        }
        const entities = Object.values(hierarchy)
        ProjectionEngine.Engine.getEntities().removeBlock(entities, entity => entity.id)
        MeshRepository.removeBlock(entities)
        MaterialRepository.removeBlock(entities)
        ProjectionEngine.Engine.getWorld().removeBlock(entities)

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
            PhysicsWorld.removeRigidBody(entity)
            GUIService.deleteUIEntity(entity)
            if (entity.lightComponent !== undefined || entity.meshComponent !== undefined)
                didLightsChange = true
        }

        if (didLightsChange)
            LightsService.packageLights(false, true)
    }


}
