import COMPONENTS from "../../../../../engine-core/static/COMPONENTS";
import LOCALIZATION_EN from "../../../static/LOCALIZATION_EN";

export default function getComponentLabel(component){
    switch (component){
        case COMPONENTS.MESH:
            return "Mesh"
        case COMPONENTS.CAMERA:
            return "Camera"


        case COMPONENTS.SPRITE:
            return "Sprite"
        case COMPONENTS.LIGHT:
            return LOCALIZATION_EN.LIGHT
        case COMPONENTS.SKYLIGHT:
            return LOCALIZATION_EN.SKYLIGHT
        case COMPONENTS.PHYSICS_COLLIDER:
            return "Physics collider"
        case COMPONENTS.RIGID_BODY:
            return "Rigid body"
        case COMPONENTS.CULLING:
            return "Culling"
        case COMPONENTS.UI:
            return "UI wrapper"
        case COMPONENTS.TERRAIN:
            return "Terrain"

    }
}