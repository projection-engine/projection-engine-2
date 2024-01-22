import AXIS from "../../static/AXIS"
import StaticMeshRepository from "@engine-core/repositories/StaticMeshRepository"
import GizmoState from "../util/GizmoState"
import GizmoUtil from "../util/GizmoUtil"
import IGizmo from "../IGizmo"
import Mesh from "../../../core/instances/Mesh"
import Entity from "../../../core/instances/Entity"
import DepthPickingService from "@engine-core/services/DepthPickingService"

export default class ScreenSpaceGizmo implements IGizmo {
	mesh: Mesh
	xGizmo: Entity
	yGizmo: Entity
	zGizmo: Entity


	drawGizmo() {
		GizmoUtil.drawGizmo(StaticMeshRepository.sphere, GizmoState.mainEntity.__cacheCenterMatrix, AXIS.SCREEN_SPACE)
	}

	drawToDepth(data: MutableObject) {
		GizmoUtil.drawToDepth(data, StaticMeshRepository.sphere, GizmoState.mainEntity.__cacheCenterMatrix, DepthPickingService.getPickerId(1))
	}

	onMouseMove(){}

	transformGizmo(){}

	clearState(){}
}
