import Entity from "@engine-core/instances/Entity";
import Component from "@engine-core/instances/components/Component";

enum HierarchyEvents {
    CREATE_ENTITY = "CREATE_ENTITY",
    DELETE_ENTITY = "DELETE_ENTITY",
    GET_HIERARCHY = "GET_HIERARCHY",
    SELECT_ENTITIES = "SELECT_ENTITIES",
    GET_SELECTED_ENTITIES = "GET_SELECTED_ENTITIES",
    LOCK_ENTITY = "LOCK_ENTITY",
    GET_LOCKED_ENTITY = "GET_LOCKED_ENTITY",
}

interface HierarchyToRenderElement{
    node:Entity
    component?:Component
    depth:number
}


export {HierarchyEvents, HierarchyToRenderElement}