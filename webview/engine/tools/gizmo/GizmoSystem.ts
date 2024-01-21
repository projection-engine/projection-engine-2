import GPUService from "@engine-core/services/GPUService"
import GizmoUtil from "./util/GizmoUtil"
import GizmoState from "./util/GizmoState"
import GizmoLineSystem from "./GizmoLineSystem"
import DynamicMap from "../../core/lib/DynamicMap"


export default class GizmoSystem {
	static onStart?: Function
	static onStop?: Function
	static #listeners = new DynamicMap<Function>()

	static addListener(id: string, callback: Function) {
		GizmoSystem.#listeners.set(id, callback)
	}

	static removeListener(id: string) {
		GizmoSystem.#listeners.delete(id)
	}

	static callListeners(updateTransformation = true) {
		if (updateTransformation)
			GizmoUtil.updateGizmosTransformation()
		const arr = GizmoSystem.#listeners.array
		for (let i = 0; i < arr.length; i++) {
			arr[i]()
		}
	}

	static execute() {
		const context = GPUService.context
		context.enable(context.DEPTH_TEST)
		context.clear(context.DEPTH_BUFFER_BIT)
		const m = GizmoState.mainEntity
		if (m != null && m.active) {
			GizmoUtil.createTransformationCache(m)
			const targetGizmosSize = GizmoState.targetGizmos.length
			GizmoUtil.drawGizmoToDepth()
			for (let i = 0; i < targetGizmosSize; i++) {
				GizmoState.targetGizmos[i].drawGizmo()
			}
			if (targetGizmosSize > 0) {
				GizmoLineSystem.updateLineMatrix()
				GizmoLineSystem.execute()
			}
		}
		context.enable(context.CULL_FACE)
	}


}
