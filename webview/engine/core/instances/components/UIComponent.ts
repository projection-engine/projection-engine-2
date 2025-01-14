import Component from "./Component"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class UIComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.UI
	}
	get componentKey(): string {
		return UIComponent.componentKey
	}
	__element?: HTMLElement
	uiLayoutID?: string
	wrapperStyles: [string, string][] = []
	anchorElement?: string = ""
}

RepositoryService.serializable(UIComponent)
