import Entity from "@engine-core/instances/Entity"
import SelectionStore from "@lib/stores/SelectionStore";
import {Injectable, LazyInject} from "@lib/Injection";
import AbstractStore from "@lib/stores/AbstractStore";
import HierarchyDTO from "@lib/stores/state/HierarchyDTO";
import Engine from "@engine-core/Engine";


@Injectable
export default class HierarchyStore extends AbstractStore<HierarchyDTO> {

    @LazyInject(Engine)
    static engine: Engine

    constructor() {
        super(new HierarchyDTO());
    }

    updateHierarchy() {
        const data = []
        const root = HierarchyStore.engine.getRootEntity()

        const callback = (node: Entity, depth: number) => {
            if (!node)
                return
            data.push({node, depth})
            const allComponents = node.allComponents;
            for (let i = 0; i < allComponents.length; i++) {
                const component = allComponents[i];
                data.push({component, depth: depth + 1});
            }

            const children = node.children.array
            for (let i = 0; i < children.length; i++) {
                callback(children[i], depth + 1)
            }
        }

        callback(root, 0)
        this.updateStore({hierarchy: data})
    }

    openTree() {
        const node = HierarchyStore.engine.getEntities().get(SelectionStore.getMainEntity())
        if (!node) return
        const open = {}
        let target = node
        while (target?.parent != null) {
            if (open[target.id])
                break
            open[target.id] = true
            target = target.parent
        }
        open[HierarchyStore.engine.getRootEntity().id] = true
        this.updateStore({openPath: open})
    }
}
