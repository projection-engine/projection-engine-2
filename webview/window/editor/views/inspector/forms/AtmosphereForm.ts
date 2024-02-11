import AbstractFormType from "./AbstractFormType";
import AtmosphereType from "./AtmosphereType";

export default class AtmosphereForm extends AbstractFormType {
    initialize() {
        super.initialize();

        this.group("GLOBAL", t => [
            t.number("ELAPSED_TIME", "elapsedTime", undefined, 0),
            t.number("RAYLEIGH_HEIGHT", "rayleighHeight", undefined, 0, 1),
            t.number("MIE_HEIGHT", "mieHeight", undefined, 0, 1),
            t.number("SAMPLES", "maxSamples", undefined, 1, 1),
            t.number("INTENSITY", "intensity", undefined, 1, 1),
            t.number("THRESHOLD", "threshold", 0, undefined),
        ]);
        this.group("RAYLEIGH_BETA_VALUES", t => [
            t.array(["R", "G", "B"], "betaRayleigh", .01, undefined, .01),
        ]);
        this.group("MIE_BETA_VALUES", t => [
            t.array(["R", "G", "B"], "betaMie", .01, undefined, .01),
        ]);
        this.group("RADII", t => [
            t.number("ATMOSPHERE", "atmosphereRadius", undefined, 0),
            t.number("PLANET", "planetRadius", undefined, 0),
        ]);

        this.group("SCATTERING_FUNCTION", t => [
            t.options("renderingType", [
                {
                    label: "MIE",
                    value: AtmosphereType.MIE
                },
                {
                    label: "RAYLEIGH",
                    value: AtmosphereType.RAYLEIGH
                },
                {
                    label: "COMBINED",
                    value: AtmosphereType.COMBINED
                }
            ]),
        ]);
    }
}
