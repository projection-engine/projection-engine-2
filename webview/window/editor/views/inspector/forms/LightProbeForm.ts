import AbstractFormType from "./AbstractFormType";

export default class LightProbeForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.group("SPECULAR_LIGHT", t => [
            t.number("LOD", "mipmaps", 10, 1, 1, false, comp => comp["isDiffuse"]),
        ]);
        this.group("CULLING", t => [
            t.number("MAX_DISTANCE", "maxDistance", undefined, 0),
        ]);
    }
}
