import AbstractFormType from "./AbstractFormType";
import {AtmosphereRenderingType} from "../../../services/engine-definitions";
import LocalizationEN from "@enums/LocalizationEN";

export default class AtmosphereForm extends AbstractFormType {
    label = LocalizationEN.ATMOSPHERE

    constructor() {
        super();

        this.group(LocalizationEN.GLOBAL, t => [
            t.number(LocalizationEN.ELAPSED_TIME, "elapsedTime", undefined, 0),
            t.number(LocalizationEN.RAYLEIGH_HEIGHT, "rayleighHeight", undefined, 0, 1),
            t.number(LocalizationEN.MIE_HEIGHT, "mieHeight", undefined, 0, 1),
            t.number(LocalizationEN.SAMPLES, "maxSamples", undefined, 1, 1),
            t.number(LocalizationEN.INTENSITY, "intensity", undefined, 1, 1),
            t.number(LocalizationEN.THRESHOLD, "threshold", 0, undefined),
        ]);
        this.group(LocalizationEN.RAYLEIGH_BETA_VALUES, t => [
            t.array(["R", "G", "B"], "betaRayleigh", .01, undefined, .01),
        ]);
        this.group(LocalizationEN.MIE_BETA_VALUES, t => [
            t.array(["R", "G", "B"], "betaMie", .01, undefined, .01),
        ]);
        this.group(LocalizationEN.RADII, t => [
            t.number(LocalizationEN.ATMOSPHERE, "atmosphereRadius", undefined, 0),
            t.number(LocalizationEN.PLANET, "planetRadius", undefined, 0),
        ]);

        this.group(LocalizationEN.SCATTERING_FUNCTION, t => [
            t.options("renderingType", [
                {
                    label: LocalizationEN.MIE,
                    value: AtmosphereRenderingType.MIE
                },
                {
                    label: LocalizationEN.RAYLEIGH,
                    value: AtmosphereRenderingType.RAYLEIGH
                },
                {
                    label: LocalizationEN.COMBINED,
                    value: AtmosphereRenderingType.COMBINED
                }
            ]),
        ]);
    }
}
