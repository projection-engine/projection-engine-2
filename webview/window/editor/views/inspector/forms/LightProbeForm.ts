import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class LightProbeForm extends AbstractFormType {
    label = LocalizationEN.LIGHT_PROBE
    constructor() {
        super();
        this.group(LocalizationEN.SPECULAR_LIGHT, t => [
            t.number(LocalizationEN.LOD, "mipmaps", 10, 1, 1, false, comp => comp["isDiffuse"]),
        ]);
        this.group(LocalizationEN.CULLING, t => [
            t.number(LocalizationEN.MAX_DISTANCE, "maxDistance", undefined, 0),
        ]);
    }
}
