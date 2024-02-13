import AbstractFormType from "./AbstractFormType";
import MATERIAL_RENDERING_TYPES from "@engine-core/static/MATERIAL_RENDERING_TYPES";

export default class DecalForm extends AbstractFormType {
    initialize() {
        super.initialize();

        this.group("RENDERING_MODE", t => [
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

        this.group("SHEEN_PARAMS", t => [
            t.number("SHEEN", "sheen"),
            t.number("TINT", "sheenTint"),
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.SHEEN);

        this.group("CLEAR_COAT_PARAMS", t => [
            t.number("CLEAR_COAT", "clearCoat"),
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.CLEAR_COAT);

        this.group("ANISOTROPIC_PARAMS", t => [
            t.number("ROTATION", "anisotropicRotation"),
            t.number("ANISOTROPY", "anisotropy", 1, 0)
        ], comp => comp["renderingMode"] !== MATERIAL_RENDERING_TYPES.ANISOTROPIC);

        this.group("ALBEDO", t => [
            t.imageTexture("ALBEDO", "albedoID"),
        ]);
        this.group("METALLIC", t => [
            t.imageTexture("METALLIC", "metallicID"),
        ]);
        this.group("ROUGHNESS", t => [
            t.imageTexture("ROUGHNESS", "roughnessID"),
        ]);
        this.group("AO", t => [
            t.imageTexture("AO", "occlusionID"),
        ]);
        this.group("NORMAL", t => [
            t.imageTexture("NORMAL", "normalID"),
        ]);
        this.group("SSR", t => [
            t.boolean("ENABLED", "useSSR"),
        ]);

    }
}
