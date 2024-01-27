import DynamicMap from "../lib/DynamicMap"
import Entity from "../instances/Entity"
import GUIService from "../services/GUIService"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Components from "@engine-core/static/Components";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import Engine from "@engine-core/Engine";

export default class World extends AbstractEngineCoreService {
    _entities = new DynamicMap<Entity>()
    _byComponent = new DynamicMap<DynamicMap<Entity>>()
    _rootEntity = new Entity()

    constructor(engine?: Engine) {
        super(engine);
        Object.values(Components).forEach(v => {
            this._byComponent.set(v, new DynamicMap<Entity>())
        })
        this._rootEntity.name = "World"
        this._entities.set(this._rootEntity.getId(), this._rootEntity)
    }

    getEntities() {
        return this._entities
    }

    getByComponent() {
        return this._byComponent
    }

    getRootEntity() {
        return this._rootEntity
    }

    clear() {
        Object.values(Components).forEach(v => {
            this._byComponent.set(v, new DynamicMap<Entity>())
        })
    }

    addBlock(entities: Entity[]) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            entity.components.keys().forEach(key => {
                this._byComponent.get(key).set(entity.id, entity)
                if (key === Components.MESH) {
                    entity.meshComponent.updateComponentReferences()
                } else if (key === Components.UI) {
                    GUIService.createUIEntity(entity)
                }
            })
        }
    }

    getEntitiesByComponent(component: Components): Entity[] {
        return this._byComponent.get(component).array
    }

    addEntity(entity: Entity) {
        this.addBlock([entity])
    }

    removeBlock(entities: Entity[]) {
        for (const entity of entities) {
            for (const key of entity.components.keys()) {
                this._byComponent.get(key).delete(entity.id)
            }
        }
    }
}

RepositoryService.serializable(World)