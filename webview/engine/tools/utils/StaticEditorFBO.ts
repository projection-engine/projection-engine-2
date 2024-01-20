import Framebuffer from "../../core/instances/Framebuffer";
import GPUService from "@engine-core/services/GPUService";

export default class StaticEditorFBO {
	static gizmo?: Framebuffer
	static #initialized = false

	static initialize() {
		if (StaticEditorFBO.#initialized)
			return
		StaticEditorFBO.#initialized = true
		const context = GPUService.context
		StaticEditorFBO.gizmo = (new Framebuffer())
			.texture({
				label: "GIZMO_ID",
				precision: context.RGBA,
				format: context.RGBA,
				type: context.UNSIGNED_BYTE
			})
			.depthTest()
	}
}
