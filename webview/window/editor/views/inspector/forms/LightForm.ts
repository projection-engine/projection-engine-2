import AbstractFormType from "./AbstractFormType";
import LIGHT_TYPES from "@engine-core/static/LIGHT_TYPES";

export default class LightForm extends AbstractFormType {
    initialize() {
        super.initialize();

        this.group("TYPE", t => [
            t.options("type", [
                {
                    label: "DIRECTIONAL_LIGHT",
                    value: LIGHT_TYPES.DIRECTIONAL
                },
                {
                    label: "SPOTLIGHT",
                    value: LIGHT_TYPES.SPOT
                },
                {
                    label: "POINT_LIGHT",
                    value: LIGHT_TYPES.POINT
                },

                {
                    label: "SPHERE_AREA",
                    value: LIGHT_TYPES.SPHERE
                },
                {
                    label: "DISK_AREA",
                    value: LIGHT_TYPES.DISK
                },
                {
                    label: "PLANE_AREA",
                    value: LIGHT_TYPES.PLANE
                }
            ]),
        ]);

        this.group("AREA_LIGHT", t => [
            t.number("RADIUS", "areaRadius", undefined, 0, undefined, false,  comp => comp.type === LIGHT_TYPES.PLANE),
            t.number("WIDTH", "planeAreaWidth", undefined, 0, undefined, false,  comp => comp.type !== LIGHT_TYPES.PLANE),
            t.number("HEIGHT", "planeAreaHeight", undefined, 0, undefined, false,  comp => comp.type !== LIGHT_TYPES.PLANE)
        ], this.isNotArea);

        this.group("INTENSITY_COLOR", t => [
            t.color("COLOR", "color"),
            t.number("INTENSITY", "intensity", 100, 0),
        ]);

        this.group("ATTENUATION", t => [
            t.array(["DISTANCE", "DISTANCE_SQUARED"], "attenuation", undefined, undefined, 0),
        ], comp => comp.type === LIGHT_TYPES.DIRECTIONAL);

        this.group("CUTOFF", t => [
            t.number("SMOOTHING", "smoothing", 1, 0, .01),
            t.number("MAX_DISTANCE", "cutoff", 100, 1, .1),
            t.number("RADIUS", "radius", 180, 1, .01, false, comp => comp["type"] !== LIGHT_TYPES.SPOT),
        ], comp => comp.type === LIGHT_TYPES.DIRECTIONAL);

        this.group("SHADOWS", t => [
            t.boolean("ENABLED", "shadowMap"),
            t.number("SIZE", "size", undefined, 1, undefined, false, comp => !comp.shadowMap || comp.type !== LIGHT_TYPES.DIRECTIONAL),
            t.number("FAR", "zFar", undefined, undefined, .001, false, this.checkShadows),
            t.number("NEAR", "zNear", undefined, undefined, .001, false, this.checkShadows),
            t.number("BIAS", "shadowBias", undefined, undefined, .00001, false, this.checkShadows),
            t.number("PCF_SAMPLES", "shadowSamples", 10, 1, 1, false, this.checkShadows),
            t.number("FALLOFF", "shadowAttenuationMinDistance", undefined, 1, .001, false, this.checkShadows),
            t.boolean("HAS_SSS", "hasSSS")
        ]);
    }

    private isNotArea(comp) {
        return comp.type !== LIGHT_TYPES.SPHERE && comp.type !== LIGHT_TYPES.DISK && comp.type !== LIGHT_TYPES.PLANE;
    }

    checkShadows(comp) {
        return !comp.shadowMap || comp.type !== LIGHT_TYPES.DIRECTIONAL && comp.type !== LIGHT_TYPES.POINT;
    }
}
