import SveltePortal from "@lib/SveltePortal"
import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";

@Injectable
export default class ToolTipService  extends IInjectable{
	portal = new SveltePortal(999, false)
	element
	closeCurrent
	#initialized =false

	initialize() {
		if(this.#initialized){
			return
		}
		this.#initialized = true
		document.addEventListener("dragstart", () => {
			this.portal.close()
			if (this.closeCurrent)
				this.closeCurrent()
		})
		const el = document.createElement("div")
		el.classList.add("tooltip")
		el.setAttribute("data-sveltetooltip", "-")
		this.portal.create(el)

		this.element = el
	}
}