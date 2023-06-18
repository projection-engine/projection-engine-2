import {mat4} from "gl-matrix"
import GizmoSystem from "../runtime/GizmoSystem"
import AXIS from "../static/AXIS"
import DualAxisGizmo from "./transformation/DualAxisGizmo"
import GizmoAPI from "./GizmoAPI"
import PickingAPI from "../../lib/utils/PickingAPI"
import EditorActionHistory from "../../../frontend/editor/services/EditorActionHistory"
import EngineTools from "../EngineTools"
import drawGizmoToDepth from "../utils/draw-gizmo-to-depth"
import GizmoInterface from "./GizmoInterface"
import GPU from "../../GPU"

export default class Inheritance extends GizmoInterface  {

	onMouseMove(event?:MouseEvent) {
		if (!GizmoSystem.hasStarted) {
			GizmoSystem.hasStarted = true
			EditorActionHistory.save(EngineTools.selected)
			GizmoSystem.updateGizmoToolTip()
		}
	}

	onMouseDown(event:MouseEvent) {
		this.x = event.clientX
		this.y = event.clientY
		GizmoSystem.targetGizmo.transformGizmo()
		this.#testClick()

	}

	onMouseUp() {
		if (GizmoSystem.hasStarted) {
			GizmoSystem.hasStarted = false
			EditorActionHistory.save(EngineTools.selected)
		}
		GizmoSystem.hasStarted = false
		document.exitPointerLock()
		GizmoSystem.clickedAxis = -1
		GizmoSystem.targetGizmo.transformGizmo()
	}

	#testClick() {
		if (!GizmoSystem.mainEntity)
			return
		this.transformGizmo()
		drawGizmoToDepth(this.xyz, [
			this.xGizmo.matrix,
			this.yGizmo.matrix,
			this.zGizmo.matrix,
		])
		const pickID = PickingAPI.readEntityID(this.x, this.y)
		GizmoSystem.clickedAxis = pickID

		if (pickID === 0)
			this.onMouseUp()
		else {
			GizmoSystem.wasOnGizmo = true
			GPU.canvas.requestPointerLock()
		}
	}

	transformGizmo() {
		if (!GizmoSystem.mainEntity)
			return
		mat4.copy(this.xGizmo.matrix, this.xGizmo.__cacheMatrix)
		mat4.copy(this.yGizmo.matrix, this.yGizmo.__cacheMatrix)
		mat4.copy(this.zGizmo.matrix, this.zGizmo.__cacheMatrix)

		mat4.copy(DualAxisGizmo.gizmos.XY.matrix, DualAxisGizmo.gizmos.XY.__cacheMatrix)
		mat4.copy(DualAxisGizmo.gizmos.ZY.matrix, DualAxisGizmo.gizmos.ZY.__cacheMatrix)
		mat4.copy(DualAxisGizmo.gizmos.XZ.matrix, DualAxisGizmo.gizmos.XZ.__cacheMatrix)


		GizmoAPI.translateMatrix(this.xGizmo)
		GizmoAPI.translateMatrix(this.yGizmo)
		GizmoAPI.translateMatrix(this.zGizmo)
		GizmoAPI.translateMatrix(DualAxisGizmo.gizmos.XY)
		GizmoAPI.translateMatrix(DualAxisGizmo.gizmos.ZY)
		GizmoAPI.translateMatrix(DualAxisGizmo.gizmos.XZ)
	}

	drawGizmo() {
		if (!GizmoSystem.mainEntity)
			return

		DualAxisGizmo.drawGizmo()
		GizmoAPI.drawGizmo(this.xyz, this.xGizmo.matrix, AXIS.X)
		GizmoAPI.drawGizmo(this.xyz, this.yGizmo.matrix, AXIS.Y)
		GizmoAPI.drawGizmo(this.xyz, this.zGizmo.matrix, AXIS.Z)
	}
}