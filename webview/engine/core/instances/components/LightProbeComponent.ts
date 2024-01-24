import Component from "./Component"
import LIGHT_PROBE_PROPS from "../../static/component-props/LIGHT_PROBE_PROPS"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class LightProbeComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.LIGHT_PROBE
	}
	get componentKey(): string {
		return LightProbeComponent.componentKey
	}
	_props = LIGHT_PROBE_PROPS
	mipmaps = 6
	maxDistance = 50
}

RepositoryService.serializable(LightProbeComponent)
