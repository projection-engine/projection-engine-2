import Entity from "@engine-core/instances/Entity"
import SelectionStore from "@lib/stores/SelectionStore";
import {Injectable, LazyInject} from "@lib/Injection";
import AbstractStore from "@lib/stores/AbstractStore";
import WorldOutlineDTO from "@lib/stores/state/WorldOutlineDTO";
import Engine from "@engine-core/Engine";


@Injectable
export default class WorldOutlineStore extends AbstractStore<WorldOutlineDTO> {

    @LazyInject(Engine)
    static engine: Engine

    constructor() {
        super(new WorldOutlineDTO());
    }

    updateHierarchy() {
        const data = []
        const root = WorldOutlineStore.engine.getRootEntity()

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
        const node = WorldOutlineStore.engine.getEntities().get(SelectionStore.getMainEntity())
        if (!node) return
        const open = {}
        let target = node
        while (target?.parent != null) {
            if (open[target.id])
                break
            open[target.id] = true
            target = target.parent
        }
        open[WorldOutlineStore.engine.getRootEntity().id] = true
        this.updateStore({openPath: open})
    }
}
