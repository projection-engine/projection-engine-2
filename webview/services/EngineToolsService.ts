import Engine from "@engine-core/Engine"
import CameraTracker from "@engine-tools/utils/CameraTracker"
import EngineTools from "@engine-tools/EngineTools"
import CameraAPI from "@engine-core/lib/utils/CameraAPI"
import ENVIRONMENT from "@engine-core/static/ENVIRONMENT"
import EngineResources from "@engine-core/lib/EngineResources"
import EntitySelectionStore from "@lib/stores/EntitySelectionStore"
import UIAPI from "@engine-core/lib/rendering/UIAPI"
import GPU from "@engine-core/GPU"
import EngineToolsState from "@engine-tools/EngineToolsState"
import EngineState from "@engine-core/EngineState"
import SETTINGS from "../window/editor/static/SETTINGS"
import GizmoState from "@engine-tools/gizmo/util/GizmoState"
import {Inject} from "@lib/Injection";
import VisualsStore from "@lib/stores/VisualsStore";
import EngineStore from "@lib/stores/EngineStore";
import SettingsStore from "@lib/stores/SettingsStore";

export default class EngineToolsService {
    @Inject(Engine)
    static engine: Engine

    @Inject(VisualsStore)
    static visualsStore: VisualsStore

    @Inject(EngineStore)
    static engineStore: EngineStore

    @Inject(SettingsStore)
    static settingsStore: SettingsStore

    @Inject(EntitySelectionStore)
    static entitySelectionStore: EntitySelectionStore

    static initialize() {
        EngineToolsService.entitySelectionStore
            .addListener("EngineToolsService", EngineToolsService.#updateSelection)
        EngineToolsService.engineStore
            .addListener("EngineToolsService", EngineToolsService.#updateCameraTracker)
        EngineToolsService.settingsStore
            .addListener("EngineToolsService_camera", EngineToolsService.#updateWithSettings)
        EngineToolsService.visualsStore
            .addListener("EngineToolsService", EngineToolsService.#updateEngineSettings)
    }

    static #updateSelection() {
        EngineTools.updateSelectionData(EntitySelectionStore.getEntitiesSelected())
    }

    static #updateEngineState() {
        const visualSettings = EngineToolsService.visualsStore.getData()
        EngineState.fxaaEnabled = visualSettings.FXAA
        EngineState.fxaaSpanMax = visualSettings.FXAASpanMax
        EngineState.fxaaReduceMin = visualSettings.FXAAReduceMin
        EngineState.fxaaReduceMul = visualSettings.FXAAReduceMul
        EngineState.ssgiEnabled = visualSettings.SSGI.enabled
        EngineState.ssgiBlurSamples = visualSettings.SSGI.blurSamples
        EngineState.ssgiBlurRadius = visualSettings.SSGI.blurRadius
        EngineState.ssgiStepSize = visualSettings.SSGI.stepSize
        EngineState.ssgiMaxSteps = visualSettings.SSGI.maxSteps
        EngineState.ssgiStrength = visualSettings.SSGI.strength
        EngineState.ssrFalloff = visualSettings.SSR.falloff
        EngineState.ssrStepSize = visualSettings.SSR.stepSize
        EngineState.ssrMaxSteps = visualSettings.SSR.maxSteps
        EngineState.sssMaxDistance = visualSettings.SSS.maxDistance
        EngineState.sssDepthThickness = visualSettings.SSS.depthThickness
        EngineState.sssEdgeFalloff = visualSettings.SSS.edgeFalloff
        EngineState.sssDepthDelta = visualSettings.SSS.depthDelta
        EngineState.sssMaxSteps = visualSettings.SSS.maxSteps
        EngineState.ssaoEnabled = visualSettings.SSAO.enabled
        EngineState.ssaoFalloffDistance = visualSettings.SSAO.falloffDistance
        EngineState.ssaoRadius = visualSettings.SSAO.radius
        EngineState.ssaoPower = visualSettings.SSAO.power
        EngineState.ssaoBias = visualSettings.SSAO.bias
        EngineState.ssaoBlurSamples = visualSettings.SSAO.blurSamples
        EngineState.ssaoMaxSamples = visualSettings.SSAO.maxSamples
        EngineState.physicsSubSteps = visualSettings.physicsSubSteps
        EngineState.physicsSimulationStep = visualSettings.physicsSimulationStep
        EngineResources.updateParams()
    }

    static #updateEngineSettings() {
        const visualSettings = EngineToolsService.visualsStore.getData()
        GPU.canvas.width = visualSettings.resolutionX
        GPU.canvas.height = visualSettings.resolutionY

        if (EngineToolsService.engine.environment === ENVIRONMENT.DEV)
            EngineTools.bindSystems()
        else
            EngineTools.unbindSystems()
        EngineToolsService.#updateEngineState()
    }

    static #updateCameraTracker() {
        const engine = EngineToolsService.engineStore.getData()
        const settings = EngineToolsService.settingsStore.getData()
        if (engine.executingAnimation)
            UIAPI.showUI()
        if (EngineToolsService.engine.environment === ENVIRONMENT.DEV && !engine.focusedCamera) {
            EngineToolsService.engine.CameraAPI.trackingEntity = undefined
            if (settings.camera !== undefined) {
                CameraTracker.screenSpaceMovementSpeed = settings.camera.screenSpaceMovementSpeed || 1
                CameraTracker.movementSpeed = settings.camera.movementSpeed * .1
                CameraTracker.turnSpeed = settings.camera.turnSpeed * .01
                if (settings.camera.smoothing != null)
                    EngineToolsService.engine.CameraAPI.translationSmoothing = settings.screenSpaceMovement ? 0 : settings.camera.smoothing * .001
                EngineToolsService.engine.CameraAPI.updateViewTarget(settings.camera)
            }
        }
    }

    static #updateEngineToolsState() {
        const settings = EngineToolsService.settingsStore.getData() as typeof SETTINGS
        EngineToolsState.gridColor = settings.gridColor
        EngineToolsState.gridScale = settings.gridScale * 10
        EngineToolsState.gridThreshold = settings.gridThreshold
        EngineToolsState.gridOpacity = settings.gridOpacity
        EngineToolsState.showGrid = settings.showGrid
        EngineToolsState.showIcons = settings.showIcons
        EngineToolsState.showLines = settings.showLines
        EngineToolsState.iconScale = settings.iconScale
        EngineToolsState.showOutline = settings.showOutline
        EngineToolsState.outlineColor = settings.outlineColor
        EngineToolsState.outlineWidth = settings.outlineWidth
    }

    static #updateWithSettings() {
        const settings = EngineToolsService.settingsStore.getData()
        EngineState.debugShadingModel = settings.shadingModel
        GizmoState.rotationGridSize = settings.gizmoGrid.rotationGizmo || 1
        GizmoState.translationGridSize = settings.gizmoGrid.translationGizmo || 1
        GizmoState.scalingGridSize = settings.gizmoGrid.scaleGizmo || 1
        GizmoState.transformationType = settings.transformationType
        GizmoState.sensitivity = settings?.gizmoGrid?.sensitivity / 100 || .001
        GizmoState.gizmoType = settings.gizmo
        EngineToolsService.#updateCameraTracker()
        EngineToolsService.#updateEngineToolsState()
        EngineToolsService.engine.CameraAPI.isOrthographic = settings.camera.ortho
    }
}
