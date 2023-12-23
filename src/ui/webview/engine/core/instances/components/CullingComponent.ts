import Component from "./Component"
import CULLING_COMPONENT_PROPS from "../../static/component-props/CULLING_COMPONENT_PROPS"
import COMPONENTS from "../../static/COMPONENTS"

export default class CullingComponent extends Component{
	static get componentKey(): string {
		return COMPONENTS.CULLING
	}
	get componentKey(): string {
		return CullingComponent.componentKey
	}
	_props = CULLING_COMPONENT_PROPS
	screenDoorEffect = false
	_screenDoorEffectDistanceMultiplier = .5
	_distance = 100
	_distanceCulling = false

	get screenDoorEffectDistanceMultiplier(){
		return this._screenDoorEffectDistanceMultiplier
	}
	set screenDoorEffectDistanceMultiplier(data){
		this._screenDoorEffectDistanceMultiplier = data
		this.entity.__cullingMetadata[4] = data

	}
	get distanceCulling(){
		return this._distanceCulling
	}
	set distanceCulling(data){
		this._distanceCulling = data
		this.entity.__cullingMetadata[2] = data ? 1 : 0
		this.entity.__cullingMetadata[3] = 0
		this.entity.__cullingMetadata[1] = this._distance
	}

	get distance(){
		return this._distance
	}
	set distance(data){
		this._distance = data
		this.entity.__cullingMetadata[1] = data

	}
	get screenDoorEnabled(){
		return this.entity.__cullingMetadata[5] === 1
	}
	occlusionCulling:boolean
}