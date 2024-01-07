import GIZMOS from "@enums/Gizmos"
import QueryAPI from "@engine-core/lib/utils/QueryAPI"
import GizmoTransformationType from "@enums/GizmoTransformationType"
import EntityFactoryService from "@services/EntityFactoryService"
import CAMERA_ROTATIONS from "../../../engine/tools/static/CAMERA_ROTATIONS"
import CameraTracker from "../../../engine/tools/utils/CameraTracker"
import ContextMenuOption from "@lib/context-menu/templates/ContextMenuOptions"
import EngineStateService from "@services/EngineStateService"
import LocalizationEN from "@enums/LocalizationEN"
import EditorUtil from "../util/EditorUtil"
import SelectionStore from "@lib/stores/SelectionStore";
import ProjectionEngine from "@lib/ProjectionEngine";


export default function getViewportHotkeys(): { [key: string]: ContextMenuOption } {
    const viewportHotkeys = ProjectionEngine.SettingsStore.getData().viewportHotkeys
    return {
        DUPLICATE: {
            label: "Duplicate active",
            callback: () => {
                const t = SelectionStore.getMainEntity()
                if (!t)
                    return
                const entity = QueryAPI.getEntityByID(t)
                if (entity)
                    EngineStateService.add(entity.clone())
            },
            require: viewportHotkeys.DUPLICATE,
        },

        FOCUS_ON_CAMERA: {
            label: LocalizationEN.FOCUS_ON_CAMERA,
            callback: EditorUtil.focusOnCamera,
            require: viewportHotkeys.FOCUS_ON_CAMERA,
        },
        SHOW_SELECTED: {
            label: LocalizationEN.SHOW_SELECTED,
            callback: () => ProjectionEngine.EntityHierarchyService.openTree(),
            require: viewportHotkeys.SHOW_SELECTED,
        },

        SAVE: {
            label: "Save",
            require: viewportHotkeys.SAVE,
            callback: ProjectionEngine.LevelService.save
        },
        INVERT_SELECTION: {
            label: "Invert selection",
            require: viewportHotkeys.INVERT_SELECTION,
            callback: () => ProjectionEngine.ViewportActionUtil.invertSelection()
        },
        SELECT_ALL: {
            label: "Select all",
            require: viewportHotkeys.SELECT_ALL,
            callback: () => ProjectionEngine.ViewportActionUtil.selectAll()
        },
        SELECT_NONE: {
            label: "Select none",
            require: viewportHotkeys.SELECT_NONE,
            callback: () => SelectionStore.setEntitiesSelected([])
        },
        TRANSLATION_GIZMO: {

            require: viewportHotkeys.TRANSLATION_GIZMO,
            callback: () => {
                ProjectionEngine.SettingsStore.updateStore({gizmo: GIZMOS.TRANSLATION})
            }
        },
        SELECT_HIERARCHY: {
            require: viewportHotkeys.SELECT_HIERARCHY,
            label: "Select hierarchy",
            callback: () => {
                const t = SelectionStore.getMainEntity()
                if (!t)
                    return
                const toSelect = [t, ...EditorUtil.selectEntityHierarchy(QueryAPI.getEntityByID(t))]
                SelectionStore.setEntitiesSelected([...SelectionStore.getEntitiesSelected(), ...toSelect])
            },

        },
        HIDE_ACTIVE: {
            label: "Hide active",
            callback: () => {
                const selected = SelectionStore.getEntitiesSelected()
                for (let i = 0; i < selected.length; i++)
                    EntityFactoryService.toggleEntityVisibility(selected[i], true)
                ProjectionEngine.EntityHierarchyService.updateHierarchy()
            },
            require: viewportHotkeys.HIDE_ACTIVE,
        },
        SNAP_TO_ORIGIN: {
            label: "Snap to origin",
            callback: () => {
                const selected = SelectionStore.getEntitiesSelected()
                for (let i = 0; i < selected.length; i++) {
                    const entity = QueryAPI.getEntityByID(selected[i])
                    entity._translation[0] = 0
                    entity._translation[1] = 0
                    entity._translation[2] = 0

                    entity.__changedBuffer[0] = 1
                }
            },
            require: viewportHotkeys.SNAP_TO_ORIGIN,
        },

        ROUND_TRANSFORMATION: {
            label: "Round transformation",
            callback: () => EditorUtil.snap(1),
            require: viewportHotkeys.ROUND_TRANSFORMATION,
        },

        CYCLE_GIZMOS: {
            label: "Cycle gizmos",
            callback: () => {
                const settingsInstance = ProjectionEngine.SettingsStore
                switch (settingsInstance.getData().gizmo) {
                    case GIZMOS.TRANSLATION:
                        settingsInstance.updateStore({gizmo: GIZMOS.SCALE})
                        break
                    case GIZMOS.SCALE:
                        settingsInstance.updateStore({gizmo: GIZMOS.ROTATION})
                        break
                    case GIZMOS.ROTATION:
                        settingsInstance.updateStore({gizmo: GIZMOS.NONE})
                        break
                    case GIZMOS.NONE:
                        settingsInstance.updateStore({gizmo: GIZMOS.TRANSLATION})
                        break
                }
            },
            require: viewportHotkeys.SWITCH_TRANSFORMATION,
        },
        SWITCH_TRANSFORMATION: {
            label: "Switch transformation",
            callback: () => {
                const settingsInstance = ProjectionEngine.SettingsStore
                const newT = settingsInstance.getData().transformationType === GizmoTransformationType.GLOBAL ? GizmoTransformationType.RELATIVE : GizmoTransformationType.GLOBAL
                settingsInstance.updateStore({transformationType: newT})
            },
            require: viewportHotkeys.SWITCH_TRANSFORMATION,
        },
        SNAP_TO_GRID: {
            label: "Snap to grid",
            callback: EditorUtil.snap,
            require: viewportHotkeys.SNAP_TO_GRID,
        },
        FOCUS: {
            label: "Focus on active",
            require: viewportHotkeys.FOCUS,
            callback: ProjectionEngine.ViewportActionUtil.focus
        },
        SCALE_GIZMO: {
            require: viewportHotkeys.SCALE_GIZMO,
            callback: () => ProjectionEngine.SettingsStore.updateStore({gizmo: GIZMOS.SCALE})
        },
        ROTATION_GIZMO: {
            require: viewportHotkeys.ROTATION_GIZMO,
            callback: () => ProjectionEngine.SettingsStore.updateStore({gizmo: GIZMOS.ROTATION})
        },

        GROUP: {
            label: "Group selected",
            require: viewportHotkeys.GROUP,
            callback: ProjectionEngine.ViewportActionUtil.group
        },
        FIXATE_ACTIVE: {
            label: "Fixate active",
            require: viewportHotkeys.FIXATE_ACTIVE,
            callback: ProjectionEngine.ViewportActionUtil.fixateActive
        },

        COPY: {
            label: "Copy",
            require: viewportHotkeys.COPY,
            callback: ProjectionEngine.ViewportActionUtil.copy
        },

        DELETE: {
            label: "Delete",
            require: viewportHotkeys.DELETE,
            callback: ProjectionEngine.ViewportActionUtil.deleteSelected
        },
        PASTE: {

            label: "Paste",
            require: viewportHotkeys.PASTE,
            callback: ProjectionEngine.ViewportActionUtil.paste
        },


        CAMERA_TOP: {

            require: viewportHotkeys.CAMERA_TOP,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.TOP)
        },
        CAMERA_BOTTOM: {

            require: viewportHotkeys.CAMERA_BOTTOM,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.BOTTOM)
        },
        CAMERA_LEFT: {

            require: viewportHotkeys.CAMERA_LEFT,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.LEFT)
        },
        CAMERA_RIGHT: {

            require: viewportHotkeys.CAMERA_RIGHT,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.RIGHT)
        },
        CAMERA_FRONT: {
            require: viewportHotkeys.CAMERA_FRONT,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.FRONT)
        },
        CAMERA_BACK: {
            require: viewportHotkeys.CAMERA_BACK,
            callback: () => CameraTracker.rotate(CAMERA_ROTATIONS.BACK)
        }

    }
}
