import DynamicMap from "../lib/DynamicMap"
import type Entity from "../instances/Entity"
import GUIService from "../services/GUIService"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Components from "@engine-core/static/Components";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import Engine from "@engine-core/Engine";

export default class World extends AbstractEngineCoreService {
    queryMap = new DynamicMap<Entity>()
    entities = new DynamicMap<Entity>()
    byComponent = new DynamicMap<DynamicMap<Entity>>()

    constructor(engine?: Engine) {
        super(engine);
        Object.values(Components).forEach(v => {
            this.byComponent.set(v, new DynamicMap<Entity>())
        })
    }

    clear() {
        Object.values(Components).forEach(v => {
            this.byComponent.set(v, new DynamicMap<Entity>())
        })
    }

    addBlock(entities: Entity[]) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            entity.components.keys().forEach(key => {
                this.byComponent.get(key).set(entity.id, entity)
                if (key === Components.MESH) {
                    entity.meshComponent.updateComponentReferences()
                } else if (key === Components.UI) {
                    GUIService.createUIEntity(entity)
                }
            })
        }
    }

    getByComponent(component: Components): Entity[] {
        return this.byComponent.get(component).array
    }

    addEntity(entity: Entity) {
        this.addBlock([entity])
    }

    removeBlock(entities: Entity[]) {
        for (const entity of entities) {
            for (const key of entity.components.keys()) {
                this.byComponent.get(key).delete(entity.id)
            }
        }
    }
}

RepositoryService.serializable(World)