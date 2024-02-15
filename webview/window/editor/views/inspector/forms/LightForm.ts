import AbstractFormType from "./AbstractFormType";
import LIGHT_TYPES from "@engine-core/static/LIGHT_TYPES";
import LocalizationEN from "@enums/LocalizationEN";

export default class LightForm extends AbstractFormType {
    constructor() {
        super();

        this.group("TYPE", t => [
            t.options("type", [
                {
                    label: LocalizationEN.DIRECTIONAL_LIGHT,
                    value: LIGHT_TYPES.DIRECTIONAL
                },
                {
                    label: LocalizationEN.SPOTLIGHT,
                    value: LIGHT_TYPES.SPOT
                },
                {
                    label: LocalizationEN.POINT_LIGHT,
                    value: LIGHT_TYPES.POINT
                },

                {
                    label: LocalizationEN.SPHERE_AREA,
                    value: LIGHT_TYPES.SPHERE
                },
                {
                    label: LocalizationEN.DISK_AREA,
                    value: LIGHT_TYPES.DISK
                },
                {
                    label: LocalizationEN.PLANE_AREA,
                    value: LIGHT_TYPES.PLANE
                }
            ]),
        ]);

        this.group(LocalizationEN.AREA_LIGHT, t => [
            t.number(LocalizationEN.RADIUS, "areaRadius", undefined, 0, undefined, false, comp => comp.type === LIGHT_TYPES.PLANE),
            t.number(LocalizationEN.WIDTH, "planeAreaWidth", undefined, 0, undefined, false, comp => comp.type !== LIGHT_TYPES.PLANE),
            t.number(LocalizationEN.HEIGHT, "planeAreaHeight", undefined, 0, undefined, false, comp => comp.type !== LIGHT_TYPES.PLANE)
        ], this.isNotArea);

        this.group(LocalizationEN.INTENSITY_COLOR, t => [
            t.color(LocalizationEN.COLOR, "color"),
            t.number(LocalizationEN.INTENSITY, "intensity", 100, 0),
        ]);

        this.group(LocalizationEN.ATTENUATION, t => [
            t.array([LocalizationEN.DISTANCE, LocalizationEN.DISTANCE_SQUARED], "attenuation", undefined, undefined, 0),
        ], comp => comp.type === LIGHT_TYPES.DIRECTIONAL);

        this.group(LocalizationEN.CUTOFF, t => [
            t.number(LocalizationEN.SMOOTHING, "smoothing", 1, 0, .01),
            t.number(LocalizationEN.MAX_DISTANCE, "cutoff", 100, 1, .1),
            t.number(LocalizationEN.RADIUS, "radius", 180, 1, .01, false, comp => comp["type"] !== LIGHT_TYPES.SPOT),
        ], comp => comp.type === LIGHT_TYPES.DIRECTIONAL);

        this.group(LocalizationEN.SHADOWS, t => [
            t.boolean(LocalizationEN.ENABLED, "shadowMap"),
            t.number(LocalizationEN.SIZE, "size", undefined, 1, undefined, false, comp => !comp.shadowMap || comp.type !== LIGHT_TYPES.DIRECTIONAL),
            t.number(LocalizationEN.FAR, "zFar", undefined, undefined, .001, false, this.checkShadows),
            t.number(LocalizationEN.NEAR, "zNear", undefined, undefined, .001, false, this.checkShadows),
            t.number(LocalizationEN.BIAS, "shadowBias", undefined, undefined, .00001, false, this.checkShadows),
            t.number(LocalizationEN.PCF_SAMPLES, "shadowSamples", 10, 1, 1, false, this.checkShadows),
            t.number(LocalizationEN.FALLOFF, "shadowAttenuationMinDistance", undefined, 1, .001, false, this.checkShadows),
            t.boolean(LocalizationEN.HAS_SSS, "hasSSS")
        ]);
    }

    private isNotArea(comp) {
        return comp.type !== LIGHT_TYPES.SPHERE && comp.type !== LIGHT_TYPES.DISK && comp.type !== LIGHT_TYPES.PLANE;
    }

    checkShadows(comp) {
        return !comp.shadowMap || comp.type !== LIGHT_TYPES.DIRECTIONAL && comp.type !== LIGHT_TYPES.POINT;
    }
}
