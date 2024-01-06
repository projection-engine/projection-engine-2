import ContextMenuService from "../../../../services/ContextMenuService"

import ElectronResources from "../../ElectronResources"
import IPCRoutes from "../../../../../enums/IPCRoutes";
import ProjectionEngine from "../../../../ProjectionEngine";

export default function getContextAction() {
    let startPosition = undefined
    let open = false
    return (event) => {
        event.preventDefault()
        if (ProjectionEngine.ContextMenuService.blockContext)
            return
        ProjectionEngine.ContextMenuService.currentX = event.clientX
        ProjectionEngine.ContextMenuService.currentY = event.clientY
        const elements = document.elementsFromPoint(event.clientX, event.clientY)
        let focused
        for (let i = 0; i < elements.length; i++) {
            if ("getAttribute" in elements[i]) {
                const ID = elements[i].id
                const dataID = elements[i].getAttribute("data-sveltecontextid")
                const found = ProjectionEngine.ContextMenuService.data.targets[ID] || ProjectionEngine.ContextMenuService.data.targets[dataID]
                if (!found)
                    continue
                focused = found
            }
        }
        if (focused) {
            startPosition = {x: event.clientX, y: event.clientY}
            ProjectionEngine.ContextMenuService.data.focused = focused
        } else
            return

        let targetElement
        const allowAll = !ProjectionEngine.ContextMenuService.data.focused.triggers || ProjectionEngine.ContextMenuService.data.focused.triggers.length === 0

        if (allowAll)
            targetElement = event.target
        else {
            const allElements = document.elementsFromPoint(event.clientX, event.clientY)
            for (let i = 0; i < allElements.length; i++) {
                const currentElement = allElements[i]
                let hasAttribute = false
                const attributes = Array.from(currentElement.attributes)

                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i]
                    if (!attr.nodeName.includes("data-svelte"))
                        continue
                    const has = ProjectionEngine.ContextMenuService.data.focused.triggers.find(f => attr.nodeName === f)
                    hasAttribute = hasAttribute || has !== undefined
                }
                if (hasAttribute) {
                    targetElement = currentElement
                    break
                }
            }
        }
        if (targetElement) {
            let trigger = allowAll ? targetElement : undefined
            if (!trigger)
                Array.from(targetElement.attributes).forEach((attr: MutableObject) => {
                    const has = ProjectionEngine.ContextMenuService.data.focused.triggers.find((f) => attr.nodeName === f)
                    if (has)
                        trigger = has
                })
            open = true
            if (ProjectionEngine.ContextMenuService.data.focused.onFocus)
                ProjectionEngine.ContextMenuService.data.focused.onFocus(trigger, targetElement, event)

            ElectronResources.ipcRenderer.send(IPCRoutes.OPEN_CONTEXT_MENU, ProjectionEngine.ContextMenuService.data.focused.id)
        }
    }
}

