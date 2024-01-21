import Engine from "@engine-core/Engine"
import Entity from "@engine-core/instances/Entity"
import HierarchyToRenderElement from "../window/editor/views/hierarchy/template/ToRenderElement"
import SelectionStore from "@lib/stores/SelectionStore";
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import IInjectable from "@lib/IInjectable";


@Injectable
export default class EntityHierarchyService extends IInjectable{
    hierarchy: HierarchyToRenderElement[] = []
    #listening: { [key: string]: Function } = {}

    updateHierarchy() {
        const data = [], root = ProjectionEngine.Engine.getRootEntity()
        if (!root)
            return

        const callback = (node: Entity, depth: number) => {
            if (!node)
                return
            data.push({node, depth})
            node.allComponents.forEach(component => data.push({component, depth: depth + 1}))

            const children = node.children.array
            for (let i = 0; i < children.length; i++)
                callback(children[i], depth + 1)
        }
        callback(root, 0)
        this.hierarchy = data
        Object.values(this.#listening).forEach(v => v())
    }

    removeListener(internalID: string) {
        delete this.#listening[internalID]
    }

    registerListener(internalID: string, callback: Function) {
        this.#listening[internalID] = callback
        callback()
    }

    openTree() {
        const node = ProjectionEngine.Engine.getEntities().get(SelectionStore.getMainEntity())
        if (!node)
            return {}
        const open = {}

        let target = node
        while (target?.parent != null) {
            if (open[target.id])
                break
            open[target.id] = true
            target = target.parent
        }
        Object.values(this.#listening).forEach(v => v({...open}))
    }
}
