import Scripting from "@engine-core/core/Scripting"
import SelectionStore from "@lib/stores/SelectionStore"
import LocalizationEN from "@enums/LocalizationEN"
import Entity from "@engine-core/instances/Entity"
import Engine from "@engine-core/Engine"
import CameraTracker from "../../../engine/tools/utils/CameraTracker"
import COMPONENTS from "@engine-core/static/Components"
import IPCRoutes from "@enums/IPCRoutes"
import EntityQueryService from "@engine-core/services/EntityQueryService"
import GIZMOS from "@enums/Gizmos"
import GizmoState from "../../../engine/tools/gizmo/util/GizmoState";
import GizmoUtil from "../../../engine/tools/gizmo/util/GizmoUtil";
import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import ToasterService from "@services/ToasterService";
import ExecutionService from "@services/ExecutionService";
import SettingsStore from "@lib/stores/SettingsStore";


// TODO - REMOVE STATIC MEMBERS
@Injectable
export default class EditorUtil extends IInjectable {

    @Inject(SelectionStore)
    static selectionStore: SelectionStore

    @Inject(ToasterService)
    static toasterService: ToasterService

    @Inject(Engine)
    static engine: Engine

    @Inject(ExecutionService)
    static executionService: ExecutionService

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    static focusOnCamera(cameraTarget) {
        const focused = EditorUtil.settingsStore.getData().focusedCamera
        const isCamera = cameraTarget instanceof Entity
        if (!focused || isCamera && cameraTarget.id !== focused) {
            const current = isCamera ? cameraTarget : EditorUtil.engine.getEntities().get(SelectionStore.getMainEntity())
            if (current && current.cameraComponent) {
                // EditorUtil.executionService.cameraSerialization = EditorUtil.engine.getCamera().serializeState()
                CameraTracker.stopTracking()
                EditorUtil.engine.getCamera().updateViewTarget(current)
                EditorUtil.settingsStore.updateStore({focusedCamera: current.id})
            }
        } else {
            // EditorUtil.engine.getCamera().restoreState(EditorUtil.executionService.cameraSerialization)
            CameraTracker.startTracking()
            EditorUtil.settingsStore.updateStore({focusedCamera: undefined})
        }
    }

    static getComponentIcon(key) {
        switch (key) {
            case COMPONENTS.MESH:
                return "category"
            case COMPONENTS.LIGHT:
                return "light_mode"
            case COMPONENTS.CAMERA:
                return "videocam"
            case COMPONENTS.ATMOSPHERE:
                return "wb_twilight"
            case COMPONENTS.LIGHT_PROBE:
                return "lens_blur"
            case "TRANSFORMATION":
                return "transform"
            case COMPONENTS.DECAL:
                return "layers"
            case COMPONENTS.SPRITE:
                return "image"
            case COMPONENTS.PHYSICS_COLLIDER:
                return "compare_arrows"
            case COMPONENTS.RIGID_BODY:
                return "language"
            case COMPONENTS.CULLING:
                return "disabled_visible"
            case COMPONENTS.UI:
                return "widgets"
            default:
                return "code"
        }
    }

    static getComponentLabel(component) {
        switch (component) {
            case COMPONENTS.MESH:
                return LocalizationEN.MESH
            case COMPONENTS.CAMERA:
                return LocalizationEN.CAMERA
            case COMPONENTS.SPRITE:
                return LocalizationEN.SPRITE
            case COMPONENTS.DECAL:
                return LocalizationEN.DECAL
            case COMPONENTS.LIGHT:
                return LocalizationEN.LIGHT
            case COMPONENTS.ATMOSPHERE:
                return LocalizationEN.ATMOSPHERE_RENDERER
            case COMPONENTS.LIGHT_PROBE:
                return LocalizationEN.LIGHT_PROBE
            case COMPONENTS.PHYSICS_COLLIDER:
                return LocalizationEN.PHYSICS_COLLIDER
            case COMPONENTS.RIGID_BODY:
                return LocalizationEN.RIGID_BODY
            case COMPONENTS.CULLING:
                return LocalizationEN.CULLING
            case COMPONENTS.UI:
                return LocalizationEN.UI_WRAPPER
        }
    }

    static async resolveFileName(path: string, ext: string): Promise<string> {
        return await EditorUtil.getCall(IPCRoutes.RESOLVE_NAME, {path, ext}, false)
    }

    static selectEntityHierarchy(start: Entity): string[] {
        const result: string[] = []
        const direct = start.children.array
        direct.forEach(d => result.push(...EditorUtil.selectEntityHierarchy(d)))
        result.push(...direct.map(c => c.id))
        return result
    }

    static snap(grid?: number) {
        const selected = SelectionStore.getEntitiesSelected()
        for (let i = 0; i < selected.length; i++) {
            const entity = EntityQueryService.getEntityByID(selected[i])
            const currentGizmo = EditorUtil.settingsStore.getData().gizmo

            switch (currentGizmo) {
                case GIZMOS.TRANSLATION: {
                    const g = grid ? grid : GizmoState.translationGridSize
                    entity._translation[0] = GizmoUtil.nearestX(entity._translation[0], g)
                    entity._translation[1] = GizmoUtil.nearestX(entity._translation[1], g)
                    entity._translation[2] = GizmoUtil.nearestX(entity._translation[2], g)
                    break
                }
                case GIZMOS.SCALE: {
                    const g = grid ? grid : GizmoState.scalingGridSize
                    entity._scaling[0] = GizmoUtil.nearestX(entity._scaling[0], g)
                    entity._scaling[1] = GizmoUtil.nearestX(entity._scaling[1], g)
                    entity._scaling[2] = GizmoUtil.nearestX(entity._scaling[2], g)
                    break
                }
                case GIZMOS.ROTATION: {
                    const g = grid ? grid : GizmoState.rotationGridSize
                    entity._rotationQuaternion[0] = GizmoUtil.nearestX(entity._rotationQuaternion[0], g)
                    entity._rotationQuaternion[1] = GizmoUtil.nearestX(entity._rotationQuaternion[1], g)
                    entity._rotationQuaternion[2] = GizmoUtil.nearestX(entity._rotationQuaternion[2], g)
                    entity._rotationQuaternion[3] = GizmoUtil.nearestX(entity._rotationQuaternion[2], g)
                    break
                }
            }
            entity.changed = true
        }
    }


    static getCall<T>(channel, data, addMiddle = true): Promise<T> {
        return new Promise(resolve => {
            let listenID = crypto.randomUUID()
            if (data.listenID)
                listenID = data.listenID
            resolve(null)
        })
    }
}
