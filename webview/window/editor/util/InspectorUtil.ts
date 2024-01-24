import LocalizationEN from "@enums/LocalizationEN"
import COMPONENTS from "@engine-core/static/Components"
import EngineResourceLoaderService from "@services/EngineResourceLoaderService"
import FileSystemAPI from "@engine-core/services/FileSystemAPI"
import SelectionStore from "@lib/stores/SelectionStore"
import LightComponent from "@engine-core/instances/components/LightComponent"
import WorldLights from "@engine-core/core/WorldLights"
import CameraComponent from "@engine-core/instances/components/CameraComponent"
import EditorUtil from "./EditorUtil"
import type Entity from "@engine-core/instances/Entity";
import type Component from "@engine-core/instances/components/Component";
import Engine from "@engine-core/Engine";
import IInjectable from "@lib/IInjectable";
import {Inject, Injectable} from "@lib/Injection";
import EntityHierarchyService from "@services/EntityHierarchyService";
import ToasterService from "@services/ToasterService";
import SettingsStore from "@lib/stores/SettingsStore";


// TODO - REMOVE STATIC MEMBERS
@Injectable
export default class InspectorUtil extends IInjectable {

    @Inject(SelectionStore)
    static selectionStore: SelectionStore

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    @Inject(Engine)
    static engine: Engine

    @Inject(EntityHierarchyService)
    static entityHierarchyService: EntityHierarchyService

    @Inject(ToasterService)
    static toasterService: ToasterService

    static compareObjects(obj1, obj2) {
        let isValid = true
        Object.entries(obj1).forEach(([k, v]) => {
            if (k === "value")
                return

            if (typeof obj2[k] === "object")
                isValid = isValid && InspectorUtil.compareObjects(v, obj2[k])
            else if (obj2[k] === v)
                isValid = isValid && true

        })
        return isValid
    }

    static getEntityTabs(components, isCollection: boolean) {
        const result = [
            {
                icon: "settings",
                label: LocalizationEN.ENTITY_PROPERTIES,
                index: -1,
                color: "var(--pj-accent-color-secondary)"
            }
        ]
        if (isCollection)
            return result
        return [
            ...result,
            {divider: true},
            ...components.map((c, i) => ({
                icon: EditorUtil.getComponentIcon(c.componentKey),
                label: EditorUtil.getComponentLabel(c.componentKey),
                index: i, color: "var(--pj-accent-color-tertiary)"
            }))
        ]
    }

    static updateEntityComponent(entity: Entity, key: string, value: any, component: typeof Component) {
        if (component instanceof LightComponent) {
            entity.needsLightUpdate = true
            WorldLights.packageLights(true)
        }
        if (component instanceof CameraComponent) {
            entity.__cameraNeedsUpdate = true
        }
        component[key] = value
        if (component.componentKey === COMPONENTS.CAMERA && entity.id === InspectorUtil.settingsStore.getData().focusedCamera)
            InspectorUtil.engine.getCamera().updateViewTarget(entity)
    }

    static removeComponent(entity, index, key) {
        if (!entity)
            return
        if (index != null) {
            entity.scripts[index] = undefined
            entity.scripts = entity.scripts.filter(e => e)
        } else
            entity.removeComponent(key)

        InspectorUtil.entityHierarchyService.updateHierarchy()
        InspectorUtil.selectionStore.updateStore({array: SelectionStore.getEntitiesSelected()})
    }

    static async handleComponentDrop(entity, data) {
        try {
            const id = JSON.parse(data)[0]
            const type = InspectorUtil.getItemFound(id)
            if (type == null)
                return

            switch (type) {
                case "MESH":
                    if (!entity.meshComponent) {
                        entity.addComponent(COMPONENTS.MESH)
                        entity.addComponent(COMPONENTS.CULLING)
                    }
                    await EngineResourceLoaderService.load(id, true)
                    entity.meshComponent.meshID = id
                    break
                case "MATERIAL":
                    entity.meshComponent.materialID = id
                    break
                case "IMAGE":
                    (entity.addComponent(COMPONENTS.SPRITE)).imageID = await FileSystemAPI.loadTexture(id)
                    break
            }
        } catch (err) {
            console.error(err)
        }

    }

    static getItemFound(id) {
        // TODO
        return null
    }


}
