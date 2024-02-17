import AbstractFormType from "./AbstractFormType";
import MATERIAL_RENDERING_TYPES from "@engine-core/static/MATERIAL_RENDERING_TYPES";
import LocalizationEN from "@enums/LocalizationEN";

export default class DecalForm extends AbstractFormType {
    label = LocalizationEN.DECAL
    constructor() {
        super();

        this.group(LocalizationEN.RENDERING_MODE, t => [
            t.options("renderingMode", [
                {
                    label: "Isotropic",
                    value: MATERIAL_RENDERING_TYPES.ISOTROPIC
                },
                {
                    label: "Anisotropic",
                    value: MATERIAL_RENDERING_TYPES.ANISOTROPIC
                },
                {
                    label: "Sheen",
                    value: MATERIAL_RENDERING_TYPES.SHEEN
                },
                {
                    label: "Clear-coat",
                    value: MATERIAL_RENDERING_TYPES.CLEAR_COAT
                }
            ])
        ]);

        this.group(LocalizationEN.SHEEN_PARAMS, t => [
            t.number(LocalizationEN.SHEEN, "sheen"),
            t.number(LocalizationEN.TINT, "sheenTint"),
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.SHEEN);

        this.group(LocalizationEN.CLEAR_COAT_PARAMS, t => [
            t.number(LocalizationEN.CLEAR_COAT, "clearCoat"),
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.CLEAR_COAT);

        this.group(LocalizationEN.ANISOTROPIC_PARAMS, t => [
            t.number(LocalizationEN.ROTATION, "anisotropicRotation"),
            t.number(LocalizationEN.ANISOTROPY, "anisotropy", 1, 0)
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.ANISOTROPIC);

        this.group(LocalizationEN.ALBEDO, t => [
            t.imageTexture(LocalizationEN.ALBEDO, "albedoID"),
        ]);
        this.group(LocalizationEN.METALLIC, t => [
            t.imageTexture(LocalizationEN.METALLIC, "metallicID"),
        ]);
        this.group(LocalizationEN.ROUGHNESS, t => [
            t.imageTexture(LocalizationEN.ROUGHNESS, "roughnessID"),
        ]);
        this.group(LocalizationEN.AO, t => [
            t.imageTexture(LocalizationEN.AO, "occlusionID"),
        ]);
        this.group(LocalizationEN.NORMAL, t => [
            t.imageTexture(LocalizationEN.NORMAL, "normalID"),
        ]);
        this.group(LocalizationEN.SSR, t => [
            t.boolean(LocalizationEN.ENABLED, "useSSR"),
        ]);

    }
}
