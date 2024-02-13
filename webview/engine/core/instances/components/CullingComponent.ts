import Component from "./Component"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class CullingComponent extends Component{
	static get componentKey(): string {
		return COMPONENTS.CULLING
	}
	get componentKey(): string {
		return CullingComponent.componentKey
	}
	screenDoorEffect = false
	_screenDoorEffectDistanceMultiplier = .5
	_distance = 100
	_distanceCulling = false
	occlusionCulling = false

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
}

RepositoryService.serializable(CullingComponent)
