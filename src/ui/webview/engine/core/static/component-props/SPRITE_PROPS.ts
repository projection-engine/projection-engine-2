import Component from "../../instances/components/Component"

export default [
	Component.group("TEXTURE", [
		Component.imageTexture("IMAGE", "imageID"),
	]),
	Component.group("TRANSFORMATION", [
		Component.boolean("ALWAYS_FACE_CAMERA", "alwaysFaceCamera"),
		Component.boolean("KEEP_SAME_SIZE", "keepSameSize"),
	])
]