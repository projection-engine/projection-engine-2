import getComponentIcon from "../utils/get-component-icon";
import COMPONENTS from "../../../../../../engine-core/templates/COMPONENTS";
import getComponentLabel from "../utils/get-component-label";


export default [
    [COMPONENTS.LIGHT, getComponentLabel(COMPONENTS.LIGHT), getComponentIcon(COMPONENTS.LIGHT)],
    [COMPONENTS.SPRITE, getComponentLabel(COMPONENTS.SPRITE), getComponentIcon(COMPONENTS.SPRITE)],
    [COMPONENTS.DECAL, getComponentLabel(COMPONENTS.DECAL), getComponentIcon(COMPONENTS.DECAL)],
    [COMPONENTS.MESH, getComponentLabel(COMPONENTS.MESH), getComponentIcon(COMPONENTS.MESH)],
    [COMPONENTS.CAMERA, getComponentLabel(COMPONENTS.CAMERA), getComponentIcon(COMPONENTS.CAMERA)],
    [COMPONENTS.SKYLIGHT, getComponentLabel(COMPONENTS.SKYLIGHT), getComponentIcon(COMPONENTS.SKYLIGHT)],
    [COMPONENTS.PHYSICS_COLLIDER, getComponentLabel(COMPONENTS.PHYSICS_COLLIDER), getComponentIcon(COMPONENTS.PHYSICS_COLLIDER)],
    [COMPONENTS.RIGID_BODY, getComponentLabel(COMPONENTS.RIGID_BODY), getComponentIcon(COMPONENTS.RIGID_BODY)],
    [COMPONENTS.CULLING, getComponentLabel(COMPONENTS.CULLING), getComponentIcon(COMPONENTS.CULLING)],
    [COMPONENTS.UI, getComponentLabel(COMPONENTS.UI), getComponentIcon(COMPONENTS.UI)],
    // [COMPONENTS.TERRAIN, getComponentLabel(COMPONENTS.TERRAIN), getComponentIcon(COMPONENTS.UI)],
]