import SveltePortal from "../shared/lib/SveltePortal"

export default class ToolTipService  {
	portal = new SveltePortal(999, false)
	element
	closeCurrent

	constructor() {
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