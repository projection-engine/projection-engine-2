import {ComponentType} from "../../../services/engine-definitions";
import LocalizationEN from "@enums/LocalizationEN";

export default [
    {
        label: LocalizationEN.MOVEMENT,
        value: ComponentType.MOVEMENT,
    },

    {
        label: LocalizationEN.ATMOSPHERE,
        value: ComponentType.ATMOSPHERE,
    },

    {
        label: LocalizationEN.CAMERA,
        value: ComponentType.CAMERA,
    },

    {
        label: LocalizationEN.CULLING,
        value: ComponentType.CULLING,
    },

    {
        label: LocalizationEN.PHYSICS_COLLIDER,
        value: ComponentType.COLLIDER,
    },

    {
        label: LocalizationEN.DECAL,
        value: ComponentType.DECAL,
    },

    {
        label: LocalizationEN.LIGHT,
        value: ComponentType.LIGHT,
    },

    {
        label: LocalizationEN.LIGHT_PROBE,
        value: ComponentType.LIGHT_PROBE,
    },

    {
        label: LocalizationEN.MESH,
        value: ComponentType.MESH,
    },

    {
        label: LocalizationEN.TERRAIN,
        value: ComponentType.TERRAIN,
    },

    {
        label: LocalizationEN.SPRITE,
        value: ComponentType.SPRITE,
    },

] as {label: string, value: ComponentType}[];
