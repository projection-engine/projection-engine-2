import SHADING_MODELS from "@engine-core/static/ShadingModel"
import LocalizationEN from "@enums/LocalizationEN"
import ConversionAPI from "@engine-core/lib/math/ConversionAPI"
import GPU from "@engine-core/GPU"
import PickingAPI from "@engine-core/lib/utils/PickingAPI"
import Engine from "@engine-core/Engine"
import DepthPrePassSystem from "@engine-core/runtime/DepthPrePassSystem"
import EngineTools from "../../../engine/tools/EngineTools"
import {glMatrix, quat} from "gl-matrix"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import CameraTracker from "../../../engine/tools/utils/CameraTracker"
import EngineResourceLoaderService from "@services/EngineResourceLoaderService"
import getViewportContext from "../templates/get-viewport-context"
import RENDER_TARGET from "../static/RENDER_TARGET"
import SelectionStore from "@lib/stores/SelectionStore";
import CameraSerialization from "@engine-core/static/CameraSerialization";
import ProjectionEngine from "@lib/ProjectionEngine";
import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import SettingsStore from "@lib/stores/SettingsStore";

@Injectable
export default class SceneEditorUtil extends IInjectable {
    static _worker?: Worker

    @Inject(SettingsStore)
    static settings: SettingsStore

    static getLabel(shadingModel): string {
        switch (shadingModel) {
            case SHADING_MODELS.LIGHT_ONLY:
                return "SHADING_LIGHT"
            case SHADING_MODELS.ALBEDO:
                return "SHADING_UNLIT"
            case SHADING_MODELS.NORMAL:
                return "SHADING_NORMAL"
            case SHADING_MODELS.DEPTH:
                return "SHADING_DEPTH"
            case SHADING_MODELS.G_AO:
            case SHADING_MODELS.AO:
                return "SHADING_AO"
            case SHADING_MODELS.RANDOM:
                return "SHADING_RANDOM"
            case SHADING_MODELS.POSITION:
                return "POSITION"
            case SHADING_MODELS.DETAIL:
                return "SHADING_DETAIL"
            case SHADING_MODELS.ROUGHNESS:
                return "SHADING_ROUGHNESS"
            case SHADING_MODELS.METALLIC:
                return "SHADING_METALLIC"
            case SHADING_MODELS.LIGHT_COMPLEXITY:
                return "LIGHT_COMPLEXITY"
            case SHADING_MODELS.UV:
                return "SHADING_UV"
            case SHADING_MODELS.OVERDRAW:
                return "OVERDRAW"
            case SHADING_MODELS.LIGHT_QUANTITY:
                return "LIGHT_QUANTITY"
            default:
                return ""
        }
    }

    static getShadingModels() {
        return [
            {divider: true, label: LocalizationEN.MISC},
            {label: LocalizationEN.SHADING_DETAIL, id: SHADING_MODELS.DETAIL},
            {label: LocalizationEN.LIGHT_QUANTITY, id: SHADING_MODELS.LIGHT_QUANTITY},
            {divider: true, label: LocalizationEN.DEBUG_SHADING},
            {label: LocalizationEN.SHADING_DEPTH, id: SHADING_MODELS.DEPTH},
            {label: LocalizationEN.SHADING_RANDOM, id: SHADING_MODELS.RANDOM},
            {label: LocalizationEN.LIGHT_COMPLEXITY, id: SHADING_MODELS.LIGHT_COMPLEXITY},
            {label: LocalizationEN.POSITION, id: SHADING_MODELS.POSITION},
            {label: LocalizationEN.SHADING_DYNAMIC_AO, id: SHADING_MODELS.AO,},
            {label: LocalizationEN.OVERDRAW, id: SHADING_MODELS.OVERDRAW},
            {divider: true, label: LocalizationEN.MATERIAL},
            {label: LocalizationEN.SHADING_UNLIT, id: SHADING_MODELS.ALBEDO},
            {label: LocalizationEN.SHADING_ROUGHNESS, id: SHADING_MODELS.ROUGHNESS},
            {label: LocalizationEN.LIGHT_ONLY, id: SHADING_MODELS.LIGHT_ONLY}
        ].map(e => e.divider ? e : ({
            ...e,
            onClick: () => ProjectionEngine.SettingsStore.updateStore({shadingModel: e.id})
        }))
    }

    static getUnderSelectionBox(_, startCoords, endCoords) {
        const worker = SceneEditorUtil.worker()
        if (startCoords && endCoords) {
            EngineTools.drawIconsToBuffer()
            const nStart = ConversionAPI.toQuadCoordinates(startCoords.x, startCoords.y, GPU.internalResolution.w, GPU.internalResolution.h)
            const nEnd = ConversionAPI.toQuadCoordinates(endCoords.x, endCoords.y, GPU.internalResolution.w, GPU.internalResolution.h)
            try {

                const data = PickingAPI.readBlock(nStart, nEnd)
                worker.postMessage({
                    entities: ProjectionEngine.Engine.entities.array.map(e => ({id: e.id, pick: e.pickIndex})),
                    data
                }, [data.buffer])
                worker.onmessage = ({data: selected}) => SelectionStore.setEntitiesSelected(selected)

            } catch (err) {
                console.error(err, startCoords, nStart)
            }

            DepthPrePassSystem.needsUpdate = true
        }
    }

    static worker(): Worker {
        if (SceneEditorUtil._worker)
            return SceneEditorUtil._worker

        const src = ` 
            self.onmessage = ({data: {entities, data}}) => {
                const map = {}
                for(let i= 0; i < entities.length; i++){
                    const {id, pick} = entities[i]
                    map[Math.round(pick).toString()] = id
                }
                const selected = [], ids = []
                for (let i = 0; i < data.length; i += 4) {
                    const ID =  Math.round(data[i] + data[i + 1] + data[i + 1])
                    const found = map[ID.toString()]
                    if(!found || selected.includes(ID)) 
                        continue
                    selected.push(ID)
                    ids.push(found)
                }
                self.postMessage(ids)
            }
        `
        const workerBlob = new Blob([src], {type: "application/javascript"})
        const workerUrl = URL.createObjectURL(workerBlob)
        SceneEditorUtil._worker = new Worker(workerUrl)
        return SceneEditorUtil._worker
    }

    static updateGizmoGrid(key, value) {
        ProjectionEngine.SettingsStore.updateStore({
            gizmoGrid: {
                ...ProjectionEngine.SettingsStore.getData().gizmoGrid,
                [key]: value
            }
        })
    }

    static restoreCameraState(cameraMetadata: CameraSerialization | undefined) {
        try {
            if (!cameraMetadata) {
                const pitch = quat.fromEuler(quat.create(), -45, 0, 0)
                const yaw = quat.fromEuler(quat.create(), 0, 45, 0)
                ProjectionEngine.Engine.getCamera().update([5, 10, 5], quat.multiply(quat.create(), yaw, pitch))
                CameraTracker.xRotation = glMatrix.toRadian(45)
                CameraTracker.yRotation = -glMatrix.toRadian(45)
            } else {
                ProjectionEngine.Engine.getCamera().restoreState(cameraMetadata)
                CameraTracker.xRotation = cameraMetadata.prevX
                CameraTracker.yRotation = cameraMetadata.prevY
            }
        } catch (err) {
            console.error(err)
        }
    }

    static onSceneEditorMount(draggable) {
        ProjectionEngine.ContextMenuService.mount(getViewportContext(), RENDER_TARGET)
        CameraTracker.startTracking()
        draggable.onMount({
            targetElement: GPU.canvas,
            onDrop: (data, event) => EngineResourceLoaderService.load(data, false, event.clientX, event.clientY).catch(console.error),
            onDragOver: () => `
                <span data-svelteicon="-" style="font-size: 70px">add</span>
                ${LocalizationEN.DRAG_DROP}
            `
        })
    }

    static getSceneOptions() {
        const settings = SceneEditorUtil.settings.getData()
        return [
            {
                label: LocalizationEN.GRID,
                icon: settings.showGrid ? "check" : undefined,
                onClick: () => ProjectionEngine.SettingsStore.updateStore({showGrid: !settings.showGrid})
            },
            {
                label: LocalizationEN.ICONS,
                icon: settings.showIcons ? "check" : undefined,
                onClick: () => ProjectionEngine.SettingsStore.updateStore({showIcons: !settings.showIcons})
            },
            {
                label: LocalizationEN.LINES,
                icon: settings.showLines ? "check" : undefined,
                onClick: () => ProjectionEngine.SettingsStore.updateStore({showLines: !settings.showLines})
            },
            {
                label: LocalizationEN.OUTLINE,
                icon: settings.showOutline ? "check" : undefined,
                onClick: () => ProjectionEngine.SettingsStore.updateStore({showOutline: !settings.showOutline})
            },
        ]
    }

    static quaternionToEulerAngles(quaternion) {
        // Ensure quaternion is normalized
        let x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3]
        const magnitude = quat.length(quaternion)
        x /= magnitude
        y /= magnitude
        z /= magnitude
        w /= magnitude

        // Calculate roll (rotation around x-axis)
        const sinRoll = 2 * (w * x + y * z)
        const cosRoll = 1 - 2 * (x * x + y * y)
        const roll = Math.atan2(sinRoll, cosRoll)

        // Calculate pitch (rotation around y-axis)
        const sinPitch = 2 * (w * y - z * x)
        const pitch = Math.asin(sinPitch)

        // Calculate yaw (rotation around z-axis)
        const sinYaw = 2 * (w * z + x * y)
        const cosYaw = 1 - 2 * (z * z + x * x)
        const yaw = Math.atan2(sinYaw, cosYaw)

        return {
            roll: roll,
            pitch: pitch,
            yaw: yaw,
        }
    }
}
