import ScriptsAPI from "@engine-core/lib/utils/ScriptsAPI"
import SelectionStore from "@lib/stores/SelectionStore"
import LocalizationEN from "@enums/LocalizationEN"
import Entity from "@engine-core/instances/Entity"
import Engine from "@engine-core/Engine"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import CameraTracker from "../../../engine/tools/utils/CameraTracker"
import COMPONENTS from "@engine-core/static/COMPONENTS"
import IPCRoutes from "@enums/IPCRoutes"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import GIZMOS from "@enums/Gizmos"
import ContentBrowserUtil from "./ContentBrowserUtil"
import GizmoState from "../../../engine/tools/gizmo/util/GizmoState";
import GizmoUtil from "../../../engine/tools/gizmo/util/GizmoUtil";
import ProjectionEngine from "@lib/ProjectionEngine";

export default class EditorUtil {
    static async componentConstructor(entity, scriptID, autoUpdate = true) {
        await ScriptsAPI.linkScript(entity, scriptID)
        if (autoUpdate)
            ProjectionEngine.EntitySelectionStore.updateStore({array: SelectionStore.getEntitiesSelected()})
        ProjectionEngine.ToastNotificationSystem.success(LocalizationEN.ADDED_COMPONENT)
    }

    static focusOnCamera(cameraTarget) {
        const engineInstance = ProjectionEngine.EngineStore
        const focused = engineInstance.getData().focusedCamera
        const isCamera = cameraTarget instanceof Entity
        if (!focused || isCamera && cameraTarget.id !== focused) {
            const current = isCamera ? cameraTarget : ProjectionEngine.Engine.entities.get(SelectionStore.getMainEntity())
            if (current && current.cameraComponent) {
                ProjectionEngine.ExecutionService.cameraSerialization = ProjectionEngine.Engine.CameraAPI.serializeState()
                CameraTracker.stopTracking()
                ProjectionEngine.Engine.CameraAPI.updateViewTarget(current)
                engineInstance.updateStore({focusedCamera: current.id})
            }
        } else {
            ProjectionEngine.Engine.CameraAPI.restoreState(ProjectionEngine.ExecutionService.cameraSerialization)
            CameraTracker.startTracking()
            engineInstance.updateStore({focusedCamera: undefined})
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

    static async importFile(currentDirectory) {
        const {filesImported} = await EditorUtil.getCall<MutableObject>(IPCRoutes.FILE_DIALOG, {currentDirectory: currentDirectory.id}, false)
        if (filesImported.length > 0) {
            ProjectionEngine.ToastNotificationSystem.success(LocalizationEN.IMPORT_SUCCESSFUL)
            await ContentBrowserUtil.refreshFiles()
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
            const entity = QueryAPI.getEntityByID(selected[i])
            const currentGizmo = ProjectionEngine.SettingsStore.getData().gizmo

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
