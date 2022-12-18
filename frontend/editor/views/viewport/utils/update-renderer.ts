import Engine from "../../../../../engine-core/Engine";
import CameraTracker from "../../../../../engine-tools/lib/CameraTracker";
import EngineTools from "../../../../../engine-tools/EngineTools";
import CameraAPI from "../../../../../engine-core/lib/utils/CameraAPI";
import DirectionalShadows from "../../../../../engine-core/runtime/rendering/DirectionalShadows";
import GridSystem from "../../../../../engine-tools/runtime/GridSystem";
import GizmoSystem from "../../../../../engine-tools/runtime/GizmoSystem";
import GPU from "../../../../../engine-core/GPU";
import ENVIRONMENT from "../../../../../engine-core/static/ENVIRONMENT";
import SHADING_MODELS from "../../../../../engine-core/static/SHADING_MODELS";
import Loop from "../../../../../engine-core/Loop";
import RotationGizmo from "../../../../../engine-tools/lib/transformation/RotationGizmo";
import TranslationGizmo from "../../../../../engine-tools/lib/transformation/TranslationGizmo";
import ScalingGizmo from "../../../../../engine-tools/lib/transformation/ScalingGizmo";
import GIZMOS from "../../../static/GIZMOS";


export default function updateRenderer(selected, engine, settings) {
    CameraTracker.initialize(settings)
    EngineTools.updateSelectionData(selected)
    RotationGizmo.gridSize = settings.gizmoGrid.rotationGizmo || .001
    TranslationGizmo.gridSize = settings.gizmoGrid.translationGizmo || .001
    ScalingGizmo.gridSize = settings.gizmoGrid.scaleGizmo || .001
    if (Engine.environment === ENVIRONMENT.DEV && !engine.focusedCamera) {
        CameraAPI.trackingEntity = undefined
        if (settings.camera) {
            CameraTracker.movementSpeed = settings.camera.movementSpeed * .1
            CameraTracker.turnSpeed = settings.camera.turnSpeed * .01
            if (settings.camera.smoothing != null)
                CameraAPI.translationSmoothing = settings.camera?.smoothing * .001
            if (settings.camera.rotationSmoothing != null)
                CameraAPI.rotationSmoothing = settings.camera?.rotationSmoothing * .001
        }

        CameraAPI.zNear = settings.zNear
        CameraAPI.zFar = settings.zFar
        CameraAPI.fov = settings.fov

        CameraAPI.metadata.gamma = settings.gamma
        CameraAPI.metadata.exposure = settings.exposure

        if (settings.shadingModel === SHADING_MODELS.DETAIL)
            CameraAPI.updateMotionBlurState(settings.motionBlurEnabled)
    }
    if (Engine.environment === ENVIRONMENT.DEV)
        Loop.linkToExecutionPipeline(EngineTools.afterDrawing, undefined)
    else
        Loop.linkToExecutionPipeline()

    GizmoSystem.transformationType = settings.transformationType
    DirectionalShadows.allocateBuffers(settings.shadowAtlasQuantity, settings.shadowMapResolution)

    if (settings.gizmoGrid.sensitivity != null)
        GizmoSystem.sensitivity = settings.gizmoGrid.sensitivity

    GridSystem.buffer[0] = settings.gridColor || .3
    GridSystem.buffer[1] = settings.gridScale * 20. || 20.
    GridSystem.buffer[2] = settings.gridThreshold || 100.
    GridSystem.buffer[3] = settings.gridOpacity || 1.


    GPU.internalResolution = {w: settings.resolution[0], h: settings.resolution[1]}
    Engine.updateParams(
        settings,
        settings.SSGI || {},
        settings.SSR || {},
        settings.SSS || {},
        settings.SSAO || {},
        settings.physicsSimulationStep,
        settings.physicsSubSteps
    )

    switch (settings.gizmo) {
        case GIZMOS.TRANSLATION:
            GizmoSystem.targetGizmo = GizmoSystem.translationGizmo
            break
        case GIZMOS.ROTATION:
            GizmoSystem.targetGizmo = GizmoSystem.rotationGizmo
            break
        case GIZMOS.SCALE:
            GizmoSystem.targetGizmo = GizmoSystem.scaleGizmo
            break
    }
}