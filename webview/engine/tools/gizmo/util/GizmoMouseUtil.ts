import DepthPickingService from "@engine-core/services/DepthPickingService"
import AXIS from "../../static/AXIS"
import Axis from "../../static/AXIS"
import GizmoState from "./GizmoState"
import GizmoSystem from "../GizmoSystem"
import GizmoUtil from "./GizmoUtil"
import {vec3} from "gl-matrix"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository";

export default class GizmoMouseUtil {

    static onMouseUp() {
        GizmoState.hasTransformationStarted = false
        // document.exitPointerLock()
        GizmoState.clickedAxis = AXIS.NONE
        if (!GizmoState.mainEntity)
            return
        GizmoUtil.updateGizmosTransformation(true)
        GizmoSystem.callListeners()
        GizmoSystem.onStop?.()
        GizmoState.initialEntityPosition[0] = 0
        GizmoState.initialEntityPosition[1] = 0
        GizmoState.initialEntityPosition[2] = 0
    }

    static onMouseDown(event: MouseEvent) {
        if (!GizmoState.mainEntity)
            return
        GizmoUtil.updateGizmosTransformation(true)
        const axis = DepthPickingService.readEntityID(event.clientX, event.clientY, 0, FramebufferRepository.gizmo.FBO)
        if (axis === 0)
            return
        vec3.copy(GizmoState.initialEntityPosition, GizmoState.mainEntity.__pivotOffset)
        GizmoSystem.callListeners(false)
        GizmoState.wasOnGizmo = true
        GizmoState.clickedAxis = axis
        GizmoSystem.onStart?.()
    }


    static onMouseMove(event: MouseEvent) {
        if(GizmoState.clickedAxis == Axis.NONE)
            return;
        for (let i = 0; i < GizmoState.targetGizmos.length; i++) {
            GizmoState.targetGizmos[i].onMouseMove(event)
        }
    }
}
