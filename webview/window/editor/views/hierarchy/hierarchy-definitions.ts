import Entity from "@engine-core/instances/Entity";
import Component from "@engine-core/instances/components/Component";


interface HierarchyToRenderElement {
    node: Entity
    component?: Component
    depth: number
}

interface EntityDTO {
    name: string,
    entityID: number,
    children: EntityDTO[]
    components: number[]
    isActive: boolean
}

export {HierarchyToRenderElement, EntityDTO}