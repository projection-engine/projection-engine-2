import Scripting from "@engine-core/core/Scripting";
import SelectionStore from "@lib/stores/SelectionStore";
import LocalizationEN from "@enums/LocalizationEN";
import Entity from "@engine-core/instances/Entity";
import Engine from "@engine-core/Engine";
import CameraTracker from "../../../engine/tools/utils/CameraTracker";
import COMPONENTS from "@engine-core/static/Components";
import IPCRoutes from "@enums/IPCRoutes";
import EntityQueryService from "@engine-core/services/EntityQueryService";
import GIZMOS from "@enums/Gizmos";
import GizmoState from "../../../engine/tools/gizmo/util/GizmoState";
import GizmoUtil from "../../../engine/tools/gizmo/util/GizmoUtil";
import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import ToasterService from "@services/ToasterService";
import ExecutionService from "@services/ExecutionService";
import SettingsStore from "@lib/stores/SettingsStore";
import {ComponentType} from "../services/engine-definitions";

// TODO - REMOVE STATIC MEMBERS
@Injectable
export default class EditorUtil extends IInjectable {

    @Inject(SelectionStore)
    static selectionStore: SelectionStore;

    @Inject(ToasterService)
    static toasterService: ToasterService;

    @Inject(Engine)
    static engine: Engine;

    @Inject(ExecutionService)
    static executionService: ExecutionService;

    @Inject(SettingsStore)
    static settingsStore: SettingsStore;

    // static focusOnCamera(cameraTarget) {
    //     const focused = EditorUtil.settingsStore.getData().focusedCamera
    //     const isCamera = cameraTarget instanceof Entity
    //     if (!focused || isCamera && cameraTarget.id !== focused) {
    //         const current = isCamera ? cameraTarget : EditorUtil.engine.getEntities().get(SelectionStore.getMainEntity())
    //         if (current && current.cameraComponent) {
    //             // EditorUtil.executionService.cameraSerialization = EditorUtil.engine.getCamera().serializeState()
    //             CameraTracker.stopTracking()
    //             EditorUtil.engine.getCamera().updateViewTarget(current)
    //             EditorUtil.settingsStore.updateStore({focusedCamera: current.id})
    //         }
    //     } else {
    //         // EditorUtil.engine.getCamera().restoreState(EditorUtil.executionService.cameraSerialization)
    //         CameraTracker.startTracking()
    //         EditorUtil.settingsStore.updateStore({focusedCamera: undefined})
    //     }
    // }

    static getComponentIcon(key: ComponentType) {
        switch (key) {
            case ComponentType.MESH_MATERIAL:
                return "category";
            case ComponentType.LIGHT:
                return "light_mode";
            case ComponentType.CAMERA:
                return "videocam";
            case ComponentType.ATMOSPHERE:
                return "wb_twilight";
            case ComponentType.LIGHT_PROBE:
                return "lens_blur";
            case ComponentType.MOVEMENT:
                return "transform";
            case ComponentType.DECAL:
                return "layers";
            case ComponentType.SPRITE:
                return "image";
            case ComponentType.COLLIDER:
                return "compare_arrows";
            case ComponentType.RIGID_BODY:
                return "language";
            case ComponentType.CULLING:
                return "disabled_visible";
            // case ComponentType.UI:
            //     return "widgets"
            default:
                return "code";
        }
    }

    static getComponentLabel(component: ComponentType) {
        switch (component) {
            case ComponentType.MESH_MATERIAL:
                return LocalizationEN.MESH;
            case ComponentType.CAMERA:
                return LocalizationEN.CAMERA;
            case ComponentType.SPRITE:
                return LocalizationEN.SPRITE;
            case ComponentType.DECAL:
                return LocalizationEN.DECAL;
            case ComponentType.LIGHT:
                return LocalizationEN.LIGHT;
            case ComponentType.ATMOSPHERE:
                return LocalizationEN.ATMOSPHERE_RENDERER;
            case ComponentType.LIGHT_PROBE:
                return LocalizationEN.LIGHT_PROBE;
            case ComponentType.COLLIDER:
                return LocalizationEN.PHYSICS_COLLIDER;
            case ComponentType.RIGID_BODY:
                return LocalizationEN.RIGID_BODY;
            case ComponentType.CULLING:
                return LocalizationEN.CULLING;
            case ComponentType.MOVEMENT:
                return LocalizationEN.MOVEMENT;
            // case COMPONENTS.UI:
            //     return LocalizationEN.UI_WRAPPER
        }
    }

    static selectEntityHierarchy(start: Entity): string[] {
        const result: string[] = [];
        const direct = start.children.array;
        direct.forEach(d => result.push(...EditorUtil.selectEntityHierarchy(d)));
        result.push(...direct.map(c => c.id));
        return result;
    }

    static snap(grid?: number) {
        const selected = SelectionStore.getEntitiesSelected();
        for (let i = 0; i < selected.length; i++) {
            const entity = EntityQueryService.getEntityByID(selected[i]);
            const currentGizmo = EditorUtil.settingsStore.getData().gizmo;

            switch (currentGizmo) {
                case GIZMOS.TRANSLATION: {
                    const g = grid ? grid : GizmoState.translationGridSize;
                    entity._translation[0] = GizmoUtil.nearestX(entity._translation[0], g);
                    entity._translation[1] = GizmoUtil.nearestX(entity._translation[1], g);
                    entity._translation[2] = GizmoUtil.nearestX(entity._translation[2], g);
                    break;
                }
                case GIZMOS.SCALE: {
                    const g = grid ? grid : GizmoState.scalingGridSize;
                    entity._scaling[0] = GizmoUtil.nearestX(entity._scaling[0], g);
                    entity._scaling[1] = GizmoUtil.nearestX(entity._scaling[1], g);
                    entity._scaling[2] = GizmoUtil.nearestX(entity._scaling[2], g);
                    break;
                }
                case GIZMOS.ROTATION: {
                    const g = grid ? grid : GizmoState.rotationGridSize;
                    entity._rotationQuaternion[0] = GizmoUtil.nearestX(entity._rotationQuaternion[0], g);
                    entity._rotationQuaternion[1] = GizmoUtil.nearestX(entity._rotationQuaternion[1], g);
                    entity._rotationQuaternion[2] = GizmoUtil.nearestX(entity._rotationQuaternion[2], g);
                    entity._rotationQuaternion[3] = GizmoUtil.nearestX(entity._rotationQuaternion[2], g);
                    break;
                }
            }
            entity.changed = true;
        }
    }

    static getCall<T>(channel, data, addMiddle = true): Promise<T> {
        return new Promise(resolve => {
            let listenID = crypto.randomUUID();
            if (data.listenID) {
                listenID = data.listenID;
            }
            resolve(null)
        })
    }
}
