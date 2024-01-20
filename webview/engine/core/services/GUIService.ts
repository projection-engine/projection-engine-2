import InputEventsAPI from "./InputEventsAPI"
import QueryAPI from "./QueryAPI"
import FileSystemAPI from "./FileSystemAPI"
import UIComponent from "../instances/components/UIComponent"
import ResourceEntityMapper from "../repositories/ResourceEntityMapper"
import Entity from "../instances/Entity"
import ProjectionEngine from "@lib/ProjectionEngine";

const STYLES = {
    position: "absolute",
    top: "0",
    zIndex: 1,
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    background: "none",
}

function mapToObject(el: HTMLElement, component: UIComponent) {
    const obj: { [key: string]: string } = {}
    component.wrapperStyles.forEach(([k, v]) => obj[k] = v)
    Object.assign(el.style, obj)
}

export default class GUIService {
    static document?: HTMLElement

    // getDocument(){
    //     return this.#document
    // }
    //
    // setDocument(el: HTMLElement){
    //     this.#document = el
    // }

    static async updateAllElements() {
        const uiElements = Array.from(ProjectionEngine.Engine.UILayouts.keys())
        for (let i = 0; i < uiElements.length; i++) {
            const found = uiElements[i]
            const entities = ProjectionEngine.Engine.entities.array.filter(e => {
                const component = e.uiComponent
                return component?.uiLayoutID === found
            })
            if (!entities.length) {
                ProjectionEngine.Engine.UILayouts.delete(found)
                continue
            }
            ProjectionEngine.Engine.UILayouts.set(found, await FileSystemAPI.readAsset(found))
            entities.forEach(e => {
                GUIService.updateUIEntity(e)
            })
        }
    }

    static deleteUIEntity(entity) {
        const UI = entity?.uiComponent
        if (!UI?.__element || !GUIService.document?.parentElement)
            return
        const children = UI.__element.querySelectorAll("[data-enginewrapper='-']")
        children.forEach(c => {
            UI.__element.removeChild(c)
            GUIService.document.appendChild(c)
            UI.anchorElement = undefined
        })
        const p = UI.__element.parentElement
        if (p)
            p.removeChild(UI.__element)
    }

    static createUIEntity(entity: Entity) {
        if (!GUIService.document?.parentElement || !entity.active || entity.uiComponent?.__element)
            return

        const UI = entity?.uiComponent
        if (!UI)
            return
        const el = document.createElement("div")
        el.setAttribute("data-engineelement", "-")
        el.setAttribute("data-enginewrapper", "-")
        el.setAttribute("data-entityid", entity.id)

        mapToObject(el, UI)

        el.id = entity.queryKey
        el.innerHTML = ProjectionEngine.Engine.UILayouts.get(UI.uiLayoutID) || ""

        const children = el.children
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (child.tagName !== "STYLE")
                child.setAttribute("data-engineelement", "-")
        }

        GUIService.document.appendChild(el)
        UI.__element = el

        return {parent: UI.anchorElement, element: el}
    }

    static buildUI(mounting: HTMLElement) {
        const target = mounting || InputEventsAPI.targetElement
        GUIService.destroyUI()
        GUIService.document = document.createElement("div")
        Object.assign(GUIService.document.style, STYLES)
        target.appendChild(GUIService.document)

        const elementsToBind = []
        const entities = ResourceEntityMapper.ui.array
        for (let i = 0; i < entities.length; i++)
            elementsToBind.push(GUIService.createUIEntity(entities[i]))
        for (let i = 0; i < elementsToBind.length; i++) {
            if (!elementsToBind[i])
                continue
            const {parent, element} = elementsToBind[i]
            const parentElement = document.getElementById(parent)
            if (!parentElement)
                continue
            GUIService.document.removeChild(element)
            parentElement.appendChild(element)
        }
    }

    static destroyUI() {
        if (!GUIService.document?.parentElement)
            return

        GUIService.document.parentElement.removeChild(GUIService.document)
        const entities = ProjectionEngine.Engine.entities.array
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            const UI = entity.uiComponent
            if (!entity.active || !UI || QueryAPI.getEntityByQueryID(entity.queryKey) !== entity)
                continue
            UI.__element = undefined
        }
    }

    static updateUIEntity(entity) {
        if (!GUIService.document?.parentElement)
            return

        const UI = entity?.uiComponent

        if (!entity.active || !UI || QueryAPI.getEntityByQueryID(entity.queryKey) !== entity || !UI.__element)
            return
        const el = UI.__element
        if (!el)
            return
        el.removeAttribute("style")
        mapToObject(el, UI)
        el.id = entity.queryKey
        const html = ProjectionEngine.Engine.UILayouts.get(UI.uiLayoutID)
        el.innerHTML = html ? html : ""
    }


    static hideUI() {
        if (!GUIService.document?.parentElement)
            return
        GUIService.document.style.display = "none"
    }

    static showUI() {
        if (!GUIService.document?.parentElement)
            return
        GUIService.document.style.display = "block"
    }
}