import Component from "./Component"
import LIGHT_PROPS from "../../static/component-props/LIGHT_PROPS"
import LIGHT_TYPES from "../../static/LIGHT_TYPES"
import WorldLights from "../../core/WorldLights"
import {mat4} from "gl-matrix"
import EntityAPI from "../../services/EntityAPI"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";


export default class LightComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.LIGHT
	}

	get componentKey(): string {
		return LightComponent.componentKey
	}

	_props = LIGHT_PROPS


	get type() {
		return this._type
	}

	set type(data) {
		const isDifferent = data !== this._type
		this._type = data
		if (isDifferent && EntityAPI.isRegistered(this.entity))
			WorldLights.packageLights(false, true)
	}


	_color = [255, 255, 255]
	fixedColor = [1, 1, 1]
	_type = LIGHT_TYPES.DIRECTIONAL
	hasSSS = false
	shadowBias = .0001
	shadowSamples = 3
	zNear = 1
	zFar = 10000
	cutoff = 50
	shadowAttenuationMinDistance = 50
	attenuation = [0, 0]
	smoothing = .5
	radius = 45
	size = 35
	atlasFace = [0, 0]
	__lightView = mat4.create()
	__lightProjection = mat4.create()
	areaRadius = 1
	planeAreaWidth = 1
	planeAreaHeight = 1
	_intensity = 1
	_shadowMap = true

	get intensity() {
		return this._intensity
	}

	set intensity(data) {
		this._intensity = data
		this.fixedColor = [this._color[0] * this.intensity / 255, this._color[1] * this.intensity / 255, this._color[2] * this.intensity / 255]
	}


	get color() {
		return this._color
	}

	set color(data) {
		this._color = data
		this.fixedColor = [this._color[0] * this.intensity / 255, this._color[1] * this.intensity / 255, this._color[2] * this.intensity / 255]
	}

	get shadowMap() {
		return this._shadowMap
	}

	set shadowMap(data) {
		if (this._shadowMap !== data)
			this.entity.needsLightUpdate = true
		this._shadowMap = data
	}


}

RepositoryService.serializable(LightComponent)
