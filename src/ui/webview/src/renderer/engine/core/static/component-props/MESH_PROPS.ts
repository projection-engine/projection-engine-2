import Component from "../../instances/components/Component"

export default [
	Component.group("RENDERING", [
		Component.meshInstance("MESH", "meshID"),
		Component.materialInstance("MATERIAL", "materialID"),
	]),
	Component.group("CONTRIBUTION", [
		Component.boolean("CASTS_SHADOWS", "castsShadows"),
		Component.boolean("CONTRIBUTE_TO_PROBES", "contributeToProbes"),
	])
]