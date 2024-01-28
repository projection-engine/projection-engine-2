import GridSystem from "./icons/GridSystem"
import IconsSystem from "./icons/IconsSystem"
import GizmoSystem from "./gizmo/GizmoSystem"
import SelectedSystem from "./outline/SelectedSystem"
import CameraTracker from "./utils/CameraTracker"
import WireframeRenderer from "./outline/WireframeRenderer"
import ENVIRONMENT from "../core/static/ENVIRONMENT"
import LineRenderer from "./icons/LineRenderer"
import Entity from "../core/instances/Entity"
import GPU from "@engine-core/core/GPU"
import StaticEditorMeshes from "./utils/StaticEditorMeshes"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository"
import GizmoState from "./gizmo/util/GizmoState"
import StaticEditorFBO from "./utils/StaticEditorFBO";
import ConversionAPI from "@engine-core/services/ConversionAPI";
import EngineToolsState from "./EngineToolsState";
import ProjectionEngine from "@lib/ProjectionEngine";
import RotationGizmo from "@engine-tools/gizmo/transformation/RotationGizmo";
import ScalingGizmo from "@engine-tools/gizmo/transformation/ScalingGizmo";
import TranslationGizmo from "@engine-tools/gizmo/transformation/TranslationGizmo";
import DualAxisGizmo from "@engine-tools/gizmo/transformation/DualAxisGizmo";
import ScreenSpaceGizmo from "@engine-tools/gizmo/transformation/ScreenSpaceGizmo";
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import ShaderRepository from "@engine-core/repositories/ShaderRepository";

export default class EngineTools extends AbstractEngineSystem {
    static selected: Entity[] = []
    static RotationGizmo: RotationGizmo
    static ScalingGizmo: ScalingGizmo
    static TranslationGizmo: TranslationGizmo
    static DualAxisGizmo: DualAxisGizmo
    static ScreenSpaceGizmo: ScreenSpaceGizmo
    static isRunning = true

    async initialize() {
        await StaticEditorMeshes.initialize()
        ProjectionEngine.Engine.setEnvironment(ENVIRONMENT.DEV)  
        LineRenderer.initialize()
        StaticEditorFBO.initialize()

        EngineTools.RotationGizmo = new RotationGizmo();
        EngineTools.ScalingGizmo = new ScalingGizmo();
        EngineTools.TranslationGizmo = new TranslationGizmo();
        EngineTools.DualAxisGizmo = new DualAxisGizmo();
        EngineTools.ScreenSpaceGizmo = new ScreenSpaceGizmo();
    }

    static onMouseMove(event: MouseEvent) {
        EngineToolsState.unconvertedMouseCoordinates[0] = event.clientX
        EngineToolsState.unconvertedMouseCoordinates[1] = event.clientY
    }

    static updateSelectionData(data: string[]) {
        const selected = EngineTools.selected
        for (let i = 0; i < selected.length; i++) {
            const entity = selected[i]
            entity.__isSelected = false
        }

        selected.length = 0
        for (let i = 0; i < data.length; i++) {
            const d = data[i]
            const entity = ProjectionEngine.Engine.getEntities().get(d)
            if (entity !== undefined) {
                selected.push(entity)
                entity.__isSelected = true
            }
        }

        GizmoState.mainEntity = selected[0]
    }

    static drawIconsToBuffer() {
        GPU.context.disable(GPU.context.DEPTH_TEST)
        FramebufferRepository.visibility.use()
        ShaderRepository.iconToDepth.bind()
        GPU.bind2DTextureForDrawing(ShaderRepository.iconToDepthUniforms.image, 0, IconsSystem.iconsTexture)
        IconsSystem.loop(IconsSystem.drawIcon, ShaderRepository.iconToDepthUniforms)
        FramebufferRepository.visibility.stopMapping()
        GPU.context.enable(GPU.context.DEPTH_TEST)
    }

    execute(gl: WebGL2RenderingContext) {
        const coords = ConversionAPI.toQuadCoordinates(EngineToolsState.unconvertedMouseCoordinates[0], EngineToolsState.unconvertedMouseCoordinates[1], GPU.internalResolution.w, GPU.internalResolution.h)
        EngineToolsState.mouseCoordinates[0] = coords.x
        EngineToolsState.mouseCoordinates[1] = coords.y
        CameraTracker.updateFrame()
        SelectedSystem.drawToBuffer()
        EngineTools.#setContextState()
        GridSystem.execute()
        WireframeRenderer.execute()
        SelectedSystem.drawSilhouette()
        IconsSystem.execute()
        GizmoSystem.execute()
    }

    shouldExecute() {
        return EngineTools.isRunning
    }

    static #setContextState() {
        const context = GPU.context
        context.clear(context.DEPTH_BUFFER_BIT)
        context.disable(context.CULL_FACE)
        context.disable(context.DEPTH_TEST)
    }
}
